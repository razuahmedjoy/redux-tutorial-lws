import { useDispatch } from "react-redux";
import deleteImage from "../../assets/images/delete.svg";
import editImage from "../../assets/images/edit.svg";
import { editActive, removeTransaction } from "../../features/transaction/transactionSlice";
import { numberToBalance } from "../../utils/numWithComma";

export default function Transaction({transaction}) {
    const {name,amount,type} = transaction || {}

    const dispatch = useDispatch();



    const handleEdit = () => {
        dispatch(editActive(transaction))
    }
    const handleDelete = () => {
        dispatch(removeTransaction(transaction.id));
    }


    return (
        <li className={`transaction ${type}`}>
            <p>{name}</p>
            <div className="right">
                <p>৳ {numberToBalance(amount)}</p>
                <button onClick={handleEdit} className="link">
                    <img alt="Edit" className="icon" src={editImage} />
                </button>
                <button
                onClick={handleDelete} className="link">
                    <img alt="Delete" className="icon" src={deleteImage} />
                </button>
            </div>
        </li>
    );
}
