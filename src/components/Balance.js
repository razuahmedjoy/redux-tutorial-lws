import { useEffect } from "react";
import { useSelector } from "react-redux";
import { numberToBalance } from "../utils/numWithComma";

export default function Balance() {

    const {transactions} = useSelector(state=>state.transactions);

    const calculatedBanalce = (transactions)=>{
        let total = 0;
        transactions.forEach((transaction)=>{
            if(transaction.type === "income"){
                total += transaction.amount;
            }else{
                total -= transaction.amount;
            }
        })
        return numberToBalance(total);
    }


    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳ </span>
                <span>
                    {transactions.length > 0 ? calculatedBanalce(transactions) : 0 }
                </span>
            </h3>
        </div>
    );
}
