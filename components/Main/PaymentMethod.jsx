import axios from 'axios';
import React from 'react'
import Form from "react-bootstrap/Form";
import ConnectModal from '../Connect/ConnectModal';

export default function PaymentMethod(props) {

  
    const getPaperLink = async () => {
        let config = {
            headers: {
                "Authorization": `Bearer ${process.env.TOKEN}`,
            }
          }
        const response = await axios.post('https://paper.xyz/api/2022-08-12/checkout-link-intent', 
            {
                metadata: {},
                expiresInMinutes: 15,
                usePaperKey: true,
                hideNativeMint: false,
                hidePaperWallet: false,
                hideExternalWallet: false,
                hidePayWithCard: false,
                hideApplePayGooglePay: false,
                hidePayWithCrypto: false,
                sendEmailOnTransferSucceeded: true,
                limitPerTransaction: 5,
                contractId: 'aeed28f7-e3bc-49db-81f4-1cc5a6ef2170',
                mintMethod: {
                  name: 'paperMintPublic',
                  args: {
                    toAddress: '$WALLET',
                    quantity: '$QUANTITY',
                    _nonce: '$NONCE',
                    _signature: '$SIGNATURE',
                  },
                  payment: {
                    value: `${0.005} * $QUANTITY`,
                    currency: 'ETH',
                  },
                },
                _nonce: '$NONCE',
                _signature: '$SIGNATURE',
          
                feeBearer: 'BUYER',
                title: 'WMW Corporate Sale',
                description:
                  'WMW exists to bring together a community of women and women supporters to leverage Web3 technology to fund experts who have proven success in tactically transforming women’s rights laws across the USA and Australia.',
                imageUrl:
                  'https://womenmakingwaves.io/wp-content/uploads/2022/07/web-3.jpeg',
              
        },config);

       
    }
  return (
    <div className="payment_method">
    What payment method will you use?
    <Form>
      <Form.Check
        inline
        label="ETH"
        name="group1"
        type="radio"
        id={`inline-radio-1`}
        
        onChange={(e) => props.setIsPaymentEth(true)}
        defaultChecked={props.isPaymentEth}
      />
      <Form.Check
        inline
        label="USD"
        name="group1"
        type="radio"
        id={`inline-radio-2`}
        onChange={(e) => props.setIsPaymentEth(false)}
        
      />
      
    </Form>

    {props.isPaymentEth? <ConnectModal />: <button className='btn mintform__btn' onClick={() => getPaperLink()}>Next</button>}
   
  </div>
  )
}
