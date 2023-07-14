import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

enum Types {
  String = "string",
}

// Интерфейсы
interface Param {
  id: number;
  name: string;
  type: Types.String;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface Color {
  id: number;
  name: string;
}

// Example data
const params = [
  {
    id: 1,
    name: "Назначение",
    type: Types.String,
  },
  {
    id: 2,
    name: "Длина",
    type: Types.String,
  },
  {
    id: 3,
    name: "Тест",
    type: Types.String,
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
  colors: [],
};

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState(model.paramValues);

  const handleChange = (paramId: number, value: string) => {
    const existingIndex = paramValues.findIndex(
      (paramValue) => paramValue.paramId === paramId
    );

    const updatedParamValues = [...paramValues];

    if (existingIndex !== -1) {
      updatedParamValues[existingIndex] = {
        ...paramValues[existingIndex],
        value,
      };
    } else {
      const lastParamId = paramValues[paramValues.length - 1]?.paramId ?? 0;
      updatedParamValues.push({ paramId: lastParamId + 1, value });
    }

    setParamValues(updatedParamValues);
  };

  const getModel = (): Model => {
    return { ...model, paramValues };
  };

  useEffect(() => {
    console.log(getModel());
  }, []);

  return (
    <div id="form">
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}</label>
          <input
            type="text"
            value={
              paramValues.find((paramValue) => paramValue.paramId === param.id)
                ?.value || ""
            }
            onChange={(e) => handleChange(param.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ParamEditor params={params} model={model} />
  </React.StrictMode>
);
