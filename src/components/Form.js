import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction } from "../features/transaction/transactionSlice";

export default function Form() {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const [editMode,setEditMode] = useState(false);

    const dispatch = useDispatch();

    const {isLoading,isError,error} = useSelector(state => state.transactions)

    const reset = () => {
        setName("");
        setType("");
        setAmount("");
    }

    const handleCreate = (e) => {
        e.preventDefault();
        const data = {
            name,
            type,
            amount: parseInt(amount)
        }
        dispatch(createTransaction(data));
        reset();

    }


    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={handleCreate}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter expense name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}

                    />
                </div>

                <div className="form-group radio">
                    <label>Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === "income"}
                            onChange={(e) => setType('income')}
                        />
                        <label>Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={(e) => setType('expense')}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label >Amount</label>
                    <input
                        required
                        type="number"
                        placeholder="300"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button disabled={isLoading} type="submit" className="btn">
                    {isLoading ? "Loading..." : "Add Transaction"}
                </button>

                {!isLoading && isError && <p className="error">{error}</p>}
            </form>

            {
                editMode &&  <button className="btn cancel_edit">Cancel Edit</button>
            }
        </div>
    );
}
