import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, updateTransaction } from "../features/transaction/transactionSlice";

export default function Form() {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch();

    const { isLoading, isError, error } = useSelector(state => state.transactions)

    const { editing } = useSelector(state => state.transactions)

    // console.log(editing);
    // listen to editing state
    useEffect(() => {
        const { id } = editing || {};
        if (id) {
            setName(editing.name);
            setType(editing.type);
            setAmount(editing.amount);
            setEditMode(true);
        } else {
            reset();
            setEditMode(false);
        }

    }, [editing])


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

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            name,
            type,
            amount: parseInt(amount)
        }

        dispatch(updateTransaction({
            id: editing.id,
            data:data
        }));
        reset();
        setEditMode(false);

    }

    const toggleCancelEdit = () => {
        setEditMode(false);
        reset()
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode ? handleUpdate : handleCreate}>
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

                    {isLoading ? "Loading..." : editMode ? "Update Transaction" : "Add Transaction"}
                  

                </button>

                {!isLoading && isError && <p className="error">{error}</p>}
            </form>

            {
                editMode && <button onClick={toggleCancelEdit} className="btn cancel_edit">Cancel Edit</button>
            }
        </div>
    );
}
