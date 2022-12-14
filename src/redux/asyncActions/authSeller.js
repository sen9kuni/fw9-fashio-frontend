import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs'
import http from '../../helpers/http';

// login
export const loginSeller = createAsyncThunk('authSeller/login', async (request) => {
  const result = {}
  try {
    const send = qs.stringify(request)
    const { data } = await http().post('/loginseller', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    result.token = data.result
    // console.log(data.result);
    return result
  } catch (e) {
    result.errorMsg = e.response.data.message
    return result
  }
})
// login

// register
export const registerSeller = createAsyncThunk('authSeller/register', async (request) => {
  const result = {}
  try {
    const send = qs.stringify(request)
    const { data } = await http().post('/seller/register', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    result.successMsg = data.message;
    return result;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
})
// register

// reset pasword
export const resetPasswordSeller = createAsyncThunk('authSeller/changePassword', async (request) => {
  const result = {}
  try {
    const send = qs.stringify(request)
    const { data }= await http().post('authSeller/change-password', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    result.successMsg = data.message;
    return result;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
})
// reset pasword

// add products
export const addProduct = createAsyncThunk('authSeller/addProduct', async (param) => {
  const result = {}
  const token = param.token
  const name_product = param.name_product
  const price = param.price
  const stock = param.stock
  const condition = param.condition
  const description = param.description
  const color = param.color
  const name = param.name
  try {
    const send = qs.stringify({name_product, price, stock, condition, description, color, name})
    const { data } = await http(token).post('/ProductSeller', send, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    })
    result.successMsg = data.message;
    return result;
  } catch (e) {
    result.errorMsg = e.response.data.message;
    return result;
  }
})
// add products