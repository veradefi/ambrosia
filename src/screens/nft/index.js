import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import { mintNft } from 'store/erc721_reducer';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInputField } from 'components/FormFields';
import { LoadingBar } from 'components/LoadingBar';

const NFTSchema = yup.object().shape({
    token_id: yup.string().required("Token ID is required"),
});

export const NFTScreen = () => {

    const [saving,setSaving] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(NFTSchema)
    });

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            setSaving(true);
            await dispatch(mintNft(data))
            reset({});
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container">
            <p className="lead font-weight-bold">
                Issue NFT
            </p>

            <div className="row">
                <div className="col-12 col-lg-7">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <FormInputField
                            defaultValue=""
                            label="NFT ID"
                            name="token_id"
                            control={control}
                            error={errors.token_id}
                        />

                        <div className="text-right">
                            <button className="btn btn-success btn-lg ml-2">
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {saving && <LoadingBar message="Saving" />}

        </div>
    )
}
