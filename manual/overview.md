# Overview

All of the model building classes are structured similarly to ml.js models. Each model has three shared components regardless if it's a regression, classification or time series model.

This library was built to quickly implement [Tensorflow](https://js.tensorflow.org) and [Keras](https://js.tensorflow.org/tutorials/import-keras.html) models in JavaScript.

## Configuration

All of the model configuration is managed during creating an instance of the class. All models have `fit` and `compile` properties that are assigned to the instance `settings` property.

You can also pass the Tensorflow reference to be used, as a configuration property if you want to use the compiled C++ or GPU via CUDA versions on the `tf` property;

* `this.settings.compile` is passed to `tensorflow.model.compile` and contains the configuration for optimizers ([`read more`](https://js.tensorflow.org/api/latest/#tf.Model.compile)).
* `this.settings.fit` is passed to `tensorflow.model.fit` and contains the configuration for model fitting ([`read more`](https://js.tensorflow.org/api/latest/#tf.Sequential.fit))

### Model constructor example

```javascript
import { MultipleLinearRegression, } from 'tensorscript';
import tf from '@tensorflow/tfjs-node-gpu';

const MLR = new MultipleLinearRegression({
  fit:{
    epochs:500,
    batchSize:5,
  },
  compile:{
    loss: 'meanSquaredError',
    optimizer: 'adam',
  },
},{
  tf,
});
```

Each constructor takes two parameters `settings` and `properties`. As in the example above, *settings* are used to configure tensorflow objects and properties are used to configure tensorscript (like which version of tensorflow to use).

## Training

All tensorflow models train asynchronously, therefore all tensorscript model train functions are all asynchronous. Always pass dependent and independent variables as matrix inputs.

Time series models can be trained with only one input matrix.

### Training example

```javascript

import { MultipleLinearRegression, } from 'tensorscript';

async function main(){
  const MLR = new MultipleLinearRegression();
  const x = [ [1], [2] ];
  const y = [ [3], [4] ];
  await MLR.train(x,y);
}
```

## Predicting

All prediction inputs must be the same shape as training inputs. TensorScript provides an asynchronous predict method that converts tensor values to javascript objects. If you want the tensor from tensorflow, use the calculate method instead.

### Predicting example

```javascript
import { MultipleLinearRegression, } from 'tensorscript';

async function main(){
  const MLR = new MultipleLinearRegression();
  const x = [ [1], [2] ];
  const y = [ [3], [4] ];
  await MLR.train(x,y);

  await MLR.predict([[3]]) //=> [[5]];
  const tensorPrediction = await MLR.calculate([[3]]) //=> [[5]];
  tensorPrediction.data()
    .then(tensors=> /*Typed Array*/)
}
```

## Examples

For more examples on how to do feature scaling and more, check out the *[Examples folder](https://github.com/repetere/tensorscript/tree/master/manual/examples)*.