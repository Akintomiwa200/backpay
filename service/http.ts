import { NextResponse } from 'next/server';
import { httpGet, httpPost } from './axiosInstance';
import endpoints from './endpoints';
import axios from 'axios';

class Http {
  httpGetSwaggerDocs = async () => {
    try {
      const response = await httpGet(`${endpoints.SWAGGER_DOCS}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };
  httpGetUsers = async () => {
    try {
      const response = await httpGet(`${endpoints.GET_USERS}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpRegisterUser = async (data: NextResponse) => {
    try {
      const response = await httpPost(`${endpoints.REGISTER}`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpRegisterQuery = async ({ queryKey }: any) => {
    try {
      const response = await httpGet(
        `${endpoints.REGISTERATION}?uid=${queryKey[1]}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpRegisterMutation = async (data: { id: string; password: string }) => {
    try {
      const response = await httpPost(`${endpoints.REGISTERATION}`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpUpdateSecurityQuestionMutation = async (data: {
    id: string;
    data: any[];
  }) => {
    try {
      const response = await httpPost(`${endpoints.SETQUESTION}`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpServiceUpdatePassword = async (data: { id: string; hash: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/registration/password-update`,
        data
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpServiceUpdateSecurityQuestion = async (data: {
    id: string;
    data: any[];
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/registration/security-question`,
        data
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpPurchaseAirtime = async (data: {
    oid: string;
    pin: string;
    type: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/airtime/confirm`,
        data
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpPurchaseDataBundle = async (data: {
    oid: string;
    pin: string;
    type: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/data-bundle/confirm`,
        data
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpHandleTransfer = async (data: {
    oid: string;
    pin: string;
    type: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/transfer/confirm`,
        data
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpHandleElectricity = async (data: {
    oid: string;
    pin: string;
    type: string;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/electricity/confirm`,
        data
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpLaskadCancelTransaction = async (data: { oid: string }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_LASKAD_API}/queue/cancel`,
        data
      );
      return response?.data;
    } catch (err) {
      throw err;
    }
  };

  httpGetOrderDetails = async ({ queryKey }: any) => {
    try {
      const response = await httpGet(
        `${endpoints.GET_ORDER_DETAILS(queryKey[1])}?oid=${queryKey[1]}`
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpPayOrder = async (data: { oid: string; pin: string; type: string }) => {
    try {
      const response = await httpPost(`${endpoints.PAY}`, data);
      return response?.data;
    } catch (err) {
      throw err;
    }
  };

  httpCancelTransaction = async (id: string) => {
    try {
      const response = await httpPost(`${endpoints.CANCEL_TRANSACTION}`, {
        oid: id,
      });
      return response?.data;
    } catch (err) {
      throw err;
    }
  };
  httpCreateWallet = async (data: {
    userId: string;
    answers: any[];
    action: 'create' | 'recover';
  }) => {
    try {
      const response = await httpPost(`${endpoints.AUTH}`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpGetWalletBalance = async (userId: string, address?: string) => {
    try {
      const params: any = {};
      if (userId) params.userId = userId;
      if (address) params.address = address;
      
      const response = await httpGet(`${endpoints.WALLET}`, params);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpSendTransaction = async (data: {
    from: string;
    to: string;
    amount: string;
    privateKey: string;
  }) => {
    try {
      const response = await httpPost(`${endpoints.WALLET}`, data);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  httpGetTransactions = async (address: string) => {
    try {
      const response = await httpGet(`${endpoints.TRANSACTIONS}?address=${address}`);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

}

const http = new Http();

export default http;
