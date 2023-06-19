import React from "react";
import InputLabel from "components/InputLabel";
import Label from "components/Label";
import InputGroup from "./components/InputGroup";
import { useFieldArray, useForm } from "react-hook-form";
import { EventWizardSubmit, useWizard } from "components/Wizard/WizardContext";
import { yupResolver } from "@hookform/resolvers/yup";
import PageTitle from "../components/PageTitle";
import yup from "schema";

const schema = yup
  .object({
    collectionName: yup.string().required(),
    tokenSymbol: yup.string().required(),
  })
  .required();

const Details = () => {
  const { onNextStep } = useWizard();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { fields, append } = useFieldArray({
    control,
    name: "payouts",
  });

  const onValid = (data: any) => {
    console.log(data);
    onNextStep();
  };
  const onHandleSubmit = () => {
    handleSubmit(onValid, (e) => console.log(e))();
  };

  React.useEffect(() => {
    window.addEventListener(EventWizardSubmit, onHandleSubmit);

    return () => window.removeEventListener(EventWizardSubmit, onHandleSubmit);
  });

  return (
    <div className="flex flex-col gap-10 text-white max-w-[500px]">
      <PageTitle title="List Details" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      <div className="flex flex-col gap-6">
        <InputLabel label={"Collection Name*"} {...register("collectionName")} error={errors.collectionName?.message} />
        <InputLabel label={"Token Symbol*"} helperText={"A shorthand abbreviation for your collection name. Examples: BAYC, PUNKS"} {...register("tokenSymbol")} error={errors.tokenSymbol?.message} />
        <InputLabel label={"Collection Size*"} helperText="Total number of NFTs in your collection." />
        <div>
          <div className="flex flex-col gap-2">
            <Label helperText="This is the list of addresses who will be paid out from your contract. Thunder Marketplace takes a 10% fee on all primary sales..">List Earnings*</Label>
            <div className="flex flex-col gap-2">
              {fields.map((field, index) => (
                <InputGroup key={index} />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span
              className="body-medium text-white rounded-md p-2.5 bg-gray cursor-pointer"
              onClick={() => {
                append({ walletAddress: "", percent: 0 });
              }}
            >
              Add Payout Address
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
