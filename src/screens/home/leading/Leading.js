import React,{ useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addLoan,lendLoan,listAvailableLoans } from 'store/lending_reducer';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputField } from 'components/FormFields';
import { LoadingBar } from 'components/LoadingBar';

const LeadingSchema = yup.object().shape({
    token_id: yup.string().required("Token ID is required"),
    amount: yup
        .number("Amount should be number")
        .required("Amount is required")
        .positive("Amount should be positive")
        .integer("Amount should be number"),
    duration: yup
        .number("Duration should be number")
        .required("Duration is required")
        .positive("Duration should be positive")
        .integer("Duration should be number"),
});

const LeadingTable = ({ data,lendLoanClick }) => (
    <table className="table table-striped  text-white">
        <thead>
            <tr>
                <th>Token</th>
                <th>Address</th>
                <th>Amount</th>
                <th>Term</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {(data || []).map(item => <tr key={item.id}>
                <td>{item.token_id}</td>
                <td>{item.nft_address}</td>
                <td>{item.amount}</td>
                <td>{item.duration}</td>
                <td>
                    <button className="btn btn-info" onClick={() => lendLoanClick(item)}>Lend</button>
                </td>
            </tr>)}
        </tbody>
    </table>
)

const AddLeading = ({ control,submit,errors,cancelClicked }) => (
    <div className="container my-3">
        <div className="row">
            <div className="col-8 offset-lg-2">
                <form onSubmit={submit}>

                    <FormInputField
                        defaultValue=""
                        label="Token ID"
                        name="token_id"
                        control={control}
                        error={errors.token_id}
                    />
                    <FormInputField
                        defaultValue={0}
                        label="Daily rent amount"
                        name="amount"
                        control={control}
                        type="number"
                        error={errors.amount}
                    />
                    <FormInputField
                        defaultValue={0}
                        label="Max lease duration"
                        name="duration"
                        control={control}
                        type="number"
                        error={errors.duration}
                    />
                    <div className="text-right">
                        <button type="button" onClick={cancelClicked} className="btn btn-secondary btn-lg">
                            Cancel
                        </button>
                        <button className="btn btn-success btn-lg ml-2">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)

const Leading = ({ }) => {

    const [addNew,setAddNew] = useState(false);
    const [saving,setSaving] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(LeadingSchema)
    });

    const { account } = useSelector((state) => state.polka);
    const allLoans = useSelector(state => state.lending.allLoans);
    const dispatch = useDispatch();

    useEffect(() => {
        if (account) {
            dispatch(listAvailableLoans());
        }
    },[account]);

    const lendLoanClick = (record) => {
        dispatch(lendLoan({ id: record.id,amount: record.amount }))
    }

    const cancelClicked = () => {
        setAddNew(false);
        reset({});
    }

    const onSubmit = async (data) => {
        try {
            setSaving(true);
            await dispatch(addLoan(data))
            setAddNew(false)
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            {!addNew && (
                <div>
                    <div className='mt-5' style={{ marginBottom: 16 }}>
                    </div>
                    <div className='l-l-heading' >
                        <div>Leading</div>
                        <div><button onClick={() => setAddNew(true)}>Add New</button></div>
                    </div>
                    <div className='l-l-para' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime exercitationem
                        corporis omnis itaque sunt dicta iste nam mollitia amet eos earum accusantium sint
                        explicabo similique quasi porro maiores, ullam commodi.
                    </div>
                    <LeadingTable data={allLoans} lendLoanClick={lendLoanClick} />
                </div>
            )}
            {addNew && <AddLeading
                cancelClicked={cancelClicked}
                control={control}
                errors={errors}
                submit={handleSubmit(onSubmit)}
            />}
            {saving && <LoadingBar message="Saving" />}
        </>
    );
}

export default Leading;
