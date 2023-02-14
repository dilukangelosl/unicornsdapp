// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Button, Modal } from "react-bootstrap";
// import { useWeb3React } from "@web3-react/core";
// import { mint, getAllInfo, mintWhitelist } from "../../lib/contractMethods";
// import toast from "react-hot-toast";
// import axios from "axios";
// import ConnectModal from "../Connect/ConnectModal";
// import Web3 from 'web3';
// import Countdown from "react-countdown";




// export default function Hero() {
//   const { account, active, library } = useWeb3React();
//   const [qty, setqty] = useState(1);
//   const [isOg, setIsOg] = useState(false);
//   const [proof, setProof] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [whitelistDataLoading, setWhitelisDataLoading] = useState(true);
//   const [isSale,setIsSale] = useState(false);
//   const [show, setShow] = useState({
//     show: false,
//     title: "",
//     link: "",
//     progress: false,
//     dismiss: false,
//     buttonText: "",
//   });



//   const [info, setInfo] = useState({
//     totalSupply:40,
//     maxSupply:0,
//     cost:0,
//     whitelistCost:0,
//     whiteListingSale:false,
//     maxMintAmountPerTransaction:1,
//     paused:false,
//     maxMintAmountPerWallet:1,
//     maxMintAmountPerWhitelist:1,

//   });

//   useEffect(() => {
//     if (active) {  
//       setTimeout(() => {
//         getEngine();
//       }, 500);
//     }
//   }, [active]);

//   const handleClose = () => setShow(false);

//   async function getEngine() {
//     toast("Toons contract.. please wait");
//     setLoading(true);
//     const data = await getAllInfo(library?.getSigner());
//     console.log("Contract info", data);
//     setInfo(data);
//     if (data.whiteListingSale) {
//       console.log("Whitelisting sale Enabled");
//       //call the api and set proof
//       setWhitelisDataLoading(true);
//       var  proof = await getOfProof();
//       console.log("DEBUG : WL1 : ", proof)
//       if(proof.length == 0){
//         var  proof2 = await getWlProof();
//         console.log("DEBUG : WL1 : ", proof2)
//         setProof(proof2);
        
//       }else{
//         setProof(proof);
//         setIsOg(true);
//       }
  
      
     
//       setWhitelisDataLoading(false)
//     }else{
//       setWhitelisDataLoading(false)
//     }
//     setLoading(false);
//     toast("Contract loaded, Happy minting!");
//   }



//   const renderer = (redndererData) => {
//     if (redndererData.completed) {
//       // Render a completed state
//      setIsSale(true);
//      return (<></>)
//     } else {
//       // Render a countdown
//       return (
//         <div className="countcontainer">
//           <h1 className="countdowntitle">Countdown to Pre Sale</h1>
//           <div className="countdowncomponent">
//             {/* <div className="timecontainer">
//               <div className="timerholder">{redndererData.days}</div>
//               <span className="daytitle">Days</span>
              
//             </div> */}

//             <div className="timecontainer">
//               <div className="timerholder">{redndererData.hours}</div>
//               <span className="daytitle">Hours</span>
              
//             </div>

//             <div className="timecontainer">
//               <div className="timerholder">{redndererData.minutes}</div>
//               <span className="daytitle">Minutes</span>
            
//             </div>

//             <div className="timecontainer">
//               <div className="timerholder">{redndererData.seconds}</div>
//               <span className="daytitle">Seconds</span>
             
//             </div>
//           </div>
//         </div>
//       );
//     }
//   };

 

 

//   async function getOfProof() {
//     try {
//       const response = await axios.get(
//         `https://us-central1-mofos-69a62.cloudfunctions.net/app/getproof/toons/og/${account}`
//       );
//       const whitelistingData = response.data;
//       console.log("OG API Data", whitelistingData);
//       return whitelistingData.data;
//     } catch (error) {
//       console.log("Could not reach the server for whitelisting");
//       return [];
//     }
//   }

//   async function getWlProof() {
//     try {
//       const response = await axios.get(
//         `https://us-central1-mofos-69a62.cloudfunctions.net/app/getproof/toons/wl/${account}`
//       );
//       const whitelistingData = response.data;
//       console.log("Whitelisting API Data", whitelistingData);
//       return whitelistingData.data;
//     } catch (error) {
//       console.log("Could not reach the server for whitelisting");
//       return [];
//     }
//   }

//   async function increment() {

//     if (proof.length > 0) {
//       if (qty < info.maxMintAmountPerWhitelist) {
//         setqty(qty + 1);
//       }
//     } else {
//       if (qty < 2) {
//         setqty(qty + 1);
//       }
//     }

  
//   }

//   function decrease() {
//     if (qty > 1) {
//       setqty(qty - 1);
//     }
//   }
//   const btntext = () => {
//     return account ? `Mint` : "Connect Wallet";
//   };

//   function showMintModal(state, title, link, progress, dismiss, buttonText) {
//     setShow({
//       show: state,
//       title,
//       link,
//       progress,
//       dismiss,
//       buttonText,
//     });
//   }

//   function saleStatus() {
//     if (active) {
//       if (info.paused) {
//         return "Sale is not Active";
//       } else {
//         if (info.whiteListingSale) {
//            if(proof.length > 0){
//             if(isOg){
//               return `OG Whitelisted : 0.04 ETH`;
//             }else {
//               return `Whitelisted : 0.05 ETH`;
//             }
//            }else{
//              return "Sorry you are not whitelisted";
//            }
//         } else {
//           return "SOLD OUT";
//         }
//       }
//     } else {
//       return "SOLD OUT";
//     }
//   }

//   function showWhitelistingData(){
//     return (
//       <div>
//         <h3 className="wlloadingtext">Please wait till we check your address..</h3>
//           <div className="spinner-border" role="status">
//   <span className="sr-only"></span>
// </div>
//       </div>
//     )
//   }
//   function showMintButtons() {
//     if (true) {
//       return (
//         <div className="btncontainer">
//           {/*
//                 <Button variant="dark" className="herobtn">
//                   <a
//                     href="https://calendar.google.com/event?action=TEMPLATE&tmeid=NWRkaWUzaGg1c2UzOGJhOHVpM2Npbmg1M2EgZGlsdWthbmdlbG9AbQ&tmsrc=dilukangelo%40gmail.com"
//                     target="blank"
//                     style={{ textDecoration: "none", color: "white" }}
//                   >
//                     Add to Calendar
//                   </a>
//                 </Button>
//                 */}
//           <div className="qtycontrols">
//             <button className="btn btn-clear" onClick={decrease}>
//               -
//             </button>
//             <span className="mintqty">{qty}</span>
//             <button className="btn btn-clear bluebtn" onClick={increment}>
//               +
//             </button>
//           </div>

//           <button
//             className="herobtn2"
//             onClick={async () => {
//               try {
//                 if(!account){
//                   return;
//                 }

//                 if (info.paused) {
//                   return toast.error("Sale is not Active yet");
//                 } else if (info.whiteListingSale) {
//                   if (proof.length == 0) {
//                     return toast.error("Your address is not whitelisted");
//                   }
//                 }

//                 toast("Please wait..", {
//                   icon: "👏",
//                 });
//                 var tx;
//                 if (info.whiteListingSale) {
//                   tx = await mintWhitelist(
//                     isOg,
//                     qty,
//                     proof,
//                     library?.getSigner(),
//                     account
//                   );
//                 } else {
//                   tx = await mint(qty, library?.getSigner(), account);
//                 }
//                 showMintModal(
//                   true,
//                   "Mint submitted",
//                   `https://etherscan.io/tx/${tx.hash}`,
//                   true,
//                   false,
//                   ""
//                 );
//                 await tx.wait(1);
//                 showMintModal(
//                   true,
//                   "Mint Success",
//                   `https://etherscan.io/tx/${tx.hash}`,
//                   false,
//                   true,
//                   "Done"
//                 );
              
//               } catch (error) {
//                 console.log(typeof error);
//                 console.log("Error", error.toString());
//                 if (error.toString().includes("execution reverted")) {
//                   toast.error("Please contact Admins");
//                 } else {
//                   toast.error("Insufficient funds or Transaction Error");
//                 }

//                 showMintModal(false, "", "", false, true, "Close");
//               }
//             }}
//             disabled={!account && !loading}
//           >
//             {btntext()}
//           </button>
//         </div>
//       );
//     } else {
//       return (
//         <a
//           className="herobtn2"
//           href="https://opensea.io/collection/doodories-official"
//         >
//           Opensea
//         </a>
//       );
//     }
//   }

//   function mintTitle (){
//     return `SOLD OUT`;
//      if(!loading){
//       if(info.whiteListingSale){
//         if(proof.length > 0){
//          if(isOg){
//           return `OG WHITELISTED : FREE MINT`
//          }else{
//           return `WHITELISTED : FREE MINT`
//          }
//     }else{
//       return "Sorry you are not whitelisted"
//     }
//       }else{
//         return `PUBLIC SALE :FREE MINT`
//       }
//      }
//   }

//   function mintDescription (){
//     if(!loading){
//       if(active && info.whiteListingSale){
//         if(proof.length > 0){
//           return `Welcome, Thank you for supporting Toons NFT`
//     }else{
//       return "Sorry you are not whitelisted"
//     }
//       }else{
//         return `Max 2 per wallet`
//       }
//     }
//   }
  
//   const cdate = Date.UTC(2021, 1, 5, 4);
//   return (
//     <>
//       <div className="mintmodalcontainer">
//         <Modal show={show.show} onHide={handleClose} className="mymodal">
//           <Modal.Body>
//             <div className="mintmodal">
//               <img
//                 src="/success.png"
//                 className="mintmodalimage"
//                 alt="Mintmodalimage"
//               />

             

//               <h2>{show.title}</h2>
//               <h3>
//                 See the transaction on{" "}
//                 <a href={show.link} target="_blank" rel="noreferrer">
//                   Etherscan
//                 </a>
//               </h3>
//               {show.progress && (
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="sr-only"></span>
//                 </div>
//               )}
//               <h3>{show.body}</h3>

//               {show.dismiss && (
//                 <button
//                   className="btn herobtn"
//                   onClick={handleClose}
//                 >
//                   {show.buttonText}
//                 </button>
//               )}
//             </div>
//           </Modal.Body>
//         </Modal>
//       </div>

//       <div className="hero">
//         <Container>
//               <div className="mintformgradient">
//               <div className="mintform">
//                 <img src="/toonsc.png" alt=""  className="mingcover"/>
//                     <img src="/tl.png" alt="" className="mintlogo"/>
//                    {!isSale &&  <Countdown date={cdate} renderer={renderer} />}
                  
//                    {isSale && !active &&  <ConnectModal />}
//                     {isSale && active && <>
//                     <h1 className="minttitle">{mintTitle()}</h1>
//                     {/* <p className="mintdes">{mintDescription()} </p> */}
                   
//                     {whitelistDataLoading && showWhitelistingData()}
//                     {isSale && !info.whiteListingSale &&  active && !whitelistDataLoading   && showMintButtons()} 
//                     {isSale && active && !whitelistDataLoading && proof.length > 0 && showMintButtons()} 
//                     </>}
//               </div>
//               </div>
//           {/* <Row>
//             <Col md="5" className="colcenter order-1">
//               <div className="presale-badge">{saleStatus()}</div>
//               <h1 className="title">
//                 <strong>Zazzy Zebras</strong>
//               </h1>
//               <h2 className="subtitle">{account ? "SOLD OUT" : "SOLD OUT"}</h2>
//               {showMintButtons()}

//               <h3 className="notwl">{isWhitelisted()}</h3>
//             </Col>
//             <Col md="7" className="herocol order-md-1">
//               <img src="/dusk.gif" alt="dusk" className="dusk" />
//             </Col>
//           </Row> */}
//         </Container>
        
//       </div>
//     </>
//   );
// }
