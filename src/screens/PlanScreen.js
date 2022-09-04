import React, { useEffect, useState } from 'react'
import db from '../firebase';
import "./PlanScreen.css"
import {selectUser} from "../features/userSlice"
import {useDispatch, useSelector} from "react-redux"
import { loadStripe } from '@stripe/stripe-js';
import {int,out, selectsub} from "../features/subSlice"


function PlanScreen() {
    const [products,setProducts]=useState([]);
    const user = useSelector(selectUser);
    console.log(selectsub);
    const [subscription,setSubscriptions]=useState(null);  
    const dispatch = useDispatch();


useEffect(() =>{
    db.collection("customers")
    .doc(user.uid)
    .collection('subscriptions')
    .get()
    .then(querySnapshot =>{
        querySnapshot.forEach(async subscription => {
            setSubscriptions({
                role: subscription.data().role,
                current_period_end: subscription.data().current_period_end.seconds,
                current_period_start: subscription.data().current_period_start.seconds,

            })
            if(!subscription){
                dispatch(int({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                }));
              }else{
                dispatch(out());
              }

        })
       
    })

},[user.uid,dispatch])
console.log(subscription)


    useEffect(() =>{
db.collection("products")
.where("active","==",true)
.get()
 .then((querySnapshot) =>{
    const products= {};
    querySnapshot.forEach(async productDoc =>{
        products[productDoc.id] =productDoc.data();
        const priceSnap = await productDoc.ref.collection("prices").get();
        priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices ={
                priceId: price.id,
                priceData: price.data(),
            }
        })
 
    })
    setProducts(products);
})
    },[]);
    console.log(products)
    const loadCheckout = async (priceId) => {
        const docRef =await db
        .collection("customers")
        .doc(user.uid)
        .collection("checkout_sessions")
        .add({
                 price: priceId,
                 success_url: window.location.origin,
                 cancel_url: window.location.origin,
            });
        docRef.onSnapshot(async(snap) => {
            const{ error,sessionId} =snap.data();
            if(error){
                alert(`An error occured: ${error.message}`);
            }
            if(sessionId){
                const stripe = await loadStripe(
                    "pk_test_51J3KBrSBoKHSt9ycvYGaMgPiKqXSZrq3hEOnGg3weKNI5FLfOwuqsJghPnxno3zzTDXbHjLgiyqccBZKUPMY0VuY00hcUGk3Fu"
                     )
                stripe.redirectToCheckout({sessionId});
            }
        })
    };
    console.log(products)
    return (
        <div className="planscreen">
            <br/>
            {subscription && <p>Renewal date : {new Date(subscription?.current_period_end * 1000).toLocaleDateString()} </p>}
            {Object.entries(products).map(([productId,productData]) =>{
            const isCurrentPackage =productData.name?.toLowerCase().includes(subscription?.role);
                return(
                    <div
                    key={productId}
                     className={`${
                         isCurrentPackage && "planScreen_plan--disabled"
                         } planScreen_plan`}>
                        <div className="planscreen_info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => !isCurrentPackage &&  loadCheckout(productData.prices.priceId)}>
                        {isCurrentPackage? 'Current Package': 'Subscribe'}
                        </button>
 
                    </div>
                )
            })}
        </div>
    )
}

export default PlanScreen
