import { Product } from '@/types/product';
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '@/redux/store'

// Mendapatkan semua produk
export const getProducts = createAsyncThunk<Product[]>(
    'products/getProducts',
    async () => {
        const response = await axios.get('http://localhost:5000/products');
        return response.data;
    }
);

// Membuat produk baru
export const createProduct = createAsyncThunk<Product, {title:string, price:number}>('products/createProduct', async ({title, price}) => {
        try {
            const response = await axios.post('http://localhost:5000/products', 
                { title, price }
            );
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);

// Memperbarui produk yang ada
export const updateProduct = createAsyncThunk<Product, { id: any; title: string; price: number }>(
    'products/updateProduct',
    async ({ id, title, price }) => {
        const response = await axios.patch(`http://localhost:5000/products/${id}`, { title, price });
        console.log(response)
        return response.data;
    }
);

// Menghapus produk
export const deleteProduct = createAsyncThunk<number, number>(
    'products/deleteProduct',
    async (id) => {
        await axios.delete(`http://localhost:5000/products/${id}`);
        return id;
    }
);


const productEntity = createEntityAdapter({
    selectId: (product: Product) => product.id
})

const productSlice = createSlice({
    name: 'product',
    initialState: productEntity.getInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            productEntity.setAll(state, action.payload);
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            productEntity.addOne(state, action.payload);
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            productEntity.updateOne(state, {
                id: action.payload.id,
                changes: action.payload,
            });
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            productEntity.removeOne(state, action.payload);
        });
    },
});


export const productSelectors = productEntity.getSelectors((state: RootState) => state.product)
export default productSlice.reducer;