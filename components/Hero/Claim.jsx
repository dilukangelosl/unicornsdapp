// import React, { useEffect, useState } from "react";
// import { Row, Col, Container, Button, Modal } from "react-bootstrap";
// import { useWeb3React } from "@web3-react/core";
// import { mint, isClaimable, claimGenesis, isClaimed } from "../../lib/contractMethods";
// import toast from "react-hot-toast";
// import axios from "axios";
// import ConnectModal from "../Connect/ConnectModal";
// import Web3 from 'web3';
// import Countdown from "react-countdown";




// export default function Hero() {
//   const { account, active, library } = useWeb3React();
//   const [loading, setLoading] = useState(true);
//   const [proof, setProof] = useState([]);
//   const [whitelistDataLoading, setWhitelisDataLoading] = useState(true);
//   const [isSale,setIsSale] = useState(false);
//   const [contractClaimable, setContractClaimable] = useState(false);
//   const [alreadyClaimed, setAlreadyClaimed] = useState(false);
//   const [qtyClaimable, setQtyClaimable] = useState(0);
//   const [show, setShow] = useState({
//     show: false,
//     title: "",
//     link: "",
//     progress: false,
//     dismiss: false,
//     buttonText: "",
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
//     toast("Genesis Toons contract.. please wait");
//     setLoading(true);

//     const cc = await isClaimable(library?.getSigner());
//     setContractClaimable(cc);

//     const ic = await isClaimed(account,library?.getSigner());
//     setAlreadyClaimed(ic);
    
//     const data = await getClaimData();
   
//         if(data.status){
//             setProof(data.data);
//     if(data.original){
//         setQtyClaimable(data.original.Quantity)
//     }
//         }else{
//             toast.error("Sorry you are not eligible for claims")
//         }
    
//     setLoading(false);
//     setWhitelisDataLoading(false)
  
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

 

 

//   async function getClaimData() {
//     try {
//       const response = await axios.get(
//         `https://us-central1-mofos-69a62.cloudfunctions.net/app/getproof/toonclaims/${account}`
//       );
//       const whitelistingData = response.data;
//       console.log("Claim API Data", whitelistingData);
//       return whitelistingData;
//     } catch (error) {
//       console.log("Could not reach the server for whitelisting");
//       return [];
//     }
//   }

  

 

 

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
         
         

//           <button
//             className="herobtn2"
//             disabled={(!account && !loading) && (alreadyClaimed || !contractClaimable)}
//             onClick={async () => {
//               try {
//                 if(!account){
//                   return;
//                 }

//                 if(!contractClaimable) {
//                     return toast.error("Claiming is not yet enabled");
//                 }

//                 if(proof.length == 0) {
//                     return toast.error("Sorry you cannot claim");
//                 }

//                if(alreadyClaimed) {
//                    return toast.error("You have already claimed your toons");
//                }

//                 toast("Please wait..", {
//                   icon: "👏",
//                 });
//                 var tx;
              
//                   tx = await claimGenesis(qtyClaimable, proof, library?.getSigner(), account);
                
//                 showMintModal(
//                   true,
//                   "Claim submitted",
//                   `https://etherscan.io/tx/${tx.hash}`,
//                   true,
//                   false,
//                   ""
//                 );
//                 await tx.wait(1);
//                 showMintModal(
//                   true,
//                   "Claim Success",
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
          
//           >
//             CLAIM
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
  
//      if(!loading){
//         if(proof.length > 0){
//            return <span>Congratulations<br></br> You can claim {qtyClaimable} Toons</span>
//        }else{
//          return "Sorry you are not eligible for claims"
//        }
//      }
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
//                 <img src="/toons.gif" alt=""  className="mingcover"/>
//                 <img src="/tl.png" alt="" className="mintlogo"/>
//                    {!isSale &&  <Countdown date={cdate} renderer={renderer} />}
                  
//                    {isSale && !active &&  <ConnectModal />}
//                     {isSale && active && <>
//                     <h1 className="minttitle">{mintTitle()}</h1>
                   
                   
//                     {whitelistDataLoading && showWhitelistingData()}
                  
//                     {isSale && active && !whitelistDataLoading && proof.length > 0 && showMintButtons()} 
//                     </>}
//               </div>
//               </div>
        
//         </Container>
        
//       </div>
//     </>
//   );
// }
