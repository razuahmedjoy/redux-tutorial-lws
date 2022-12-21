import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTranasctions } from "../../features/transaction/transactionSlice";
import Transaction from "./Transaction";

export default function Transactions() {

    const {transactions,isLoading,isError,error} = useSelector(state => state.transactions);
    const dispatch = useDispatch();


    useEffect(() => {

        dispatch(fetchTranasctions());

    },[dispatch])


    let content;
    if(isLoading){
        content = <p>Loading...</p>
    }
    if(!isLoading && isError){
        content = <p className="error">{error}</p>
    }
    if(!isLoading && !isError && transactions.length === 0){
        content = <p className="error">No transactions found</p>
    }
    if(!isLoading && !isError && transactions.length > 0){
        content = transactions.map((transaction) => {
            return <Transaction key={transaction.id} transaction={transaction} />
        })
    }

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
