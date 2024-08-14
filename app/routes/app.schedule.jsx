import {
  FormLayout,
  TextField,
  Card,
  ButtonGroup,
  Button,
  Form,
  Listbox,
  Combobox,
  Icon,
  LegacyStack,
  RadioButton,
} from "@shopify/polaris";
import { SearchIcon } from "@shopify/polaris-icons";

import { useState, useCallback, useMemo } from "react";
import React from "react";
import { useNavigate, useSubmit } from "react-router-dom";
import putData, { getAllData } from "../models/Schedule.server";
import { redirect } from "@remix-run/node";   
import { authenticate } from "../shopify.server";






export async function action({ request }) {
  const { admin, session } = await authenticate.admin(request);
  const { shop } = session;
  const formData = Object.fromEntries(await request.formData());

  const deliveryData = {
    ...formData,
    shop,
    days: parseInt(formData.days, 10),
    tags: formData.tags
  };

  await putData(deliveryData, admin);
  return redirect("/");
}






export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const deliveries = await getAllData();

  // const indays = deliveries[deliveries.length - 1]['days']
  // const meta = await createMetaField(admin.graphql,deliveries[deliveries.length - 1]['days']);
  // return { admin, indays };
  // return json(meta);
  return deliveries;

  // return new Response(JSON.stringify(deliveries));
}










function ComboboxExample({ inputValue, setInputValue }) {
  const deselectedOptions = useMemo(
    () => [
      { value: "rustic", label: "rustic" },
      { value: "antique", label: "antique" },
      { value: "vinyl", label: "vinyl" },
      { value: "vintage", label: "vintage" },
      { value: "refurbished", label: "refurbished" },
      { value: "wedding band", label: "wedding band" },
    ],
    [],
  );

  const [selectedOption, setSelectedOption] = useState();
  // const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(deselectedOptions);

  const escapeSpecialRegExCharacters = useCallback(
    (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    [],
  );

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === "") {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), "i");
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions, escapeSpecialRegExCharacters],
  );

  const updateSelection = useCallback(
    (selected) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || "");
    },
    [options],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const { label, value } = option;

          return (
            <Listbox.Option
              key={`${value}`}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div style={{ height: "50px", paddingTop: "20px" }}>
      <Combobox
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchIcon} />}
            onChange={updateText}
            label="Search tags"
            labelHidden
            value={inputValue}
            placeholder="Search tags"
            autoComplete="off"
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </div>
  );
}









function RadioButtonExample({ inputValue, setInputValue }) {
  const [value, setValue] = useState("all");

  const handleChange = useCallback((_, newValue) => setValue(newValue), []);

  return (
    <>
      <LegacyStack horizontal>
        <RadioButton
          label="All Products"
          helpText="Delivery for all products"
          checked={value === "all"}
          id="all"
          name="accounts"
          onChange={handleChange}
        />

        <RadioButton
          label="Select Custom Tag"
          helpText="Delivery of products with specific tag"
          id="tags"
          name="accounts"
          checked={value === "tags"}
          onChange={handleChange}
        />
      </LegacyStack>

      {value === "tags" && <ComboboxExample  inputValue={inputValue} setInputValue={setInputValue}/>}
    </>
  );
}












export default function CardDefault() {
  const submit = useSubmit();
  const navigate = useNavigate();

  // const weNeed = useLoaderData();

  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState("");
  const handleChange = useCallback((newValue) => setValue(newValue), []);

  function handleSave() {
    const allData = {
      days: value ? value : 7,
      tags: inputValue == "" ? "all" : inputValue
    };
    
    submit(allData, { method: "post" });
    // console.log(weNeed);
    shopify.toast.show("Saved Successfully");
  }

  return (
    <Form method="post">
      <Card padding="500">
        <FormLayout>
          <TextField
            id="days"
            label="Number of Days"
            type="number"
            value={value}
            onChange={handleChange}
            placeholder="Default 7 Days"
            min="1"
          />
          <RadioButtonExample inputValue={inputValue} setInputValue={setInputValue}/>
          <ButtonGroup gap="loose">
            <Button
              onClick={() => {
                navigate("/app");
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} type="submit">
              Save
            </Button>
          </ButtonGroup>
        </FormLayout>
      </Card>
    </Form>
  );
}
