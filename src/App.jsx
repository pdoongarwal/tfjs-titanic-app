import React from "react";
import * as tf from "@tensorflow/tfjs";
import { message } from "antd";

import PassengerForm from "./PassengerForm";

const getAgeCategory = age => {
  let ageCategory = 0;
  if (age > 60) {
    ageCategory = 7;
  } else if (age > 35 && age <= 60) {
    ageCategory = 6;
  } else if (age > 25 && age <= 35) {
    ageCategory = 5;
  } else if (age > 18 && age <= 25) {
    ageCategory = 4;
  } else if (age > 12 && age <= 18) {
    ageCategory = 3;
  } else if (age > 5 && age <= 12) {
    ageCategory = 2;
  } else if (age > 0 && age <= 5) {
    ageCategory = 1;
  }

  return ageCategory;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const model = await tf.loadLayersModel("/trainedModel/model.json");
    this.setState({
      model
    });
    message.success("Model successfully loaded!");
  }

  predict = values => {
    const { model } = this.state;
    const { pclass, age, gender, sibsp, parch, embarked } = values;

    const ageCategory = getAgeCategory(age);

    const data = tf.tensor2d([
      [pclass, gender, ageCategory, sibsp, parch, 0, 7, embarked]
    ]);

    const prediction = model.predict(data).dataSync()[0];
    message.success(
      `Survival Probability: ${(prediction * 100).toFixed(2)}%`,
      10
    );
  };

  render() {
    return <PassengerForm onSubmit={this.predict} />;
  }
}

export default App;
