## Bank Simulation

Simulation of a simple bank operation to find out answers. The bank has only one teller and he serves one customer at a time.
The probability of arrival of a customer is as below:

![alt text][probabilityOfCustomerArrival]

Where t denotes the seconds since the last customer arrives. For this simulation we will consider value of alpha=100 in above equation.

Each customer takes some time to finish the transation which is modeled via below beta distribution:

![alt text][customerProcessingTimeBetaDist]

There are 3 different type of customer red,blue and yellow. Different type of customer will take different amount of time for processing. We will consider p=100 and random value between 0-1 for x. For different type of customer alpha and beta value will be different and we will assume some value during simulation.


We have to find out:

1. Given only yellow customer arrives what is average and maximum wait time?
2. Given only red customers, what is average and maxium queue length?


[probabilityOfCustomerArrival]: https://github.com/chandrakantap/jibblebs/blob/master/images/probabilityOfCustomerArrival.png   "Probability of customer arrival"

[customerProcessingTimeBetaDist]: https://raw.githubusercontent.com/chandrakantap/jibblebs/master/images/customerProcessingTimeBetaDist.png "Customer Processing time distribution"
