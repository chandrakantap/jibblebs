/**
 * Assumptions:
 * - If the probability of the arrival of a customer is greater than or equal to 0.5 
 *   then we will take that the customer has arrived else not.
 * - The teller start serving the next customer immediately after completion of the transaction
 *   for previous customer.
 * - When a customer arrives the processing starts immediately if the queue is empty
 * - Minimum processing time required for a customer is 1 sec. So, if the distribution function return
 *   processing time as zero, we will take that as 1.
 */
const EXP = 2.718;
const isCustomerArrives = (timeSinceLastCustomerArrived) => {
    const probCustomerArrives = 1 - EXP ** (-(timeSinceLastCustomerArrived / 100));
    return probCustomerArrives >= 0.5;
}
const getProcessingTime = (alpha, beta) => {
    const x = Math.random();
    const processingTime = Math.round(100 * (x ** (alpha - 1)) * ((1 - x) ** (beta - 1)));
    return processingTime > 0 ? processingTime : 1;
}
const simulate = (time, alpha, beta) => {
    let avgWaitingTime = 0, maxWaitingTime = 0;
    let avgQueueLen = 0, maxQueueLen = 0;
    let noOfCustomerServed = 0;
    let timeSinceLastCustomerArrived = 0;

    const queue = [];
    let queueLen = 0;

    for (let curTime = 1; curTime < time; curTime++) {
        timeSinceLastCustomerArrived++;
        if (isCustomerArrives(timeSinceLastCustomerArrived)) {
            const processingTimeRequired = getProcessingTime(alpha, beta);
            queue.push({
                arrivedAt: curTime,
                processingTimeRequired,
                processingTimeLeft: processingTimeRequired
            });
            queueLen++;
            maxQueueLen = maxQueueLen < queueLen ? queueLen : maxQueueLen;
            timeSinceLastCustomerArrived = 0;
        }

        if (queueLen > 0) {
            queue[0].processingTimeLeft--;

            if (queue[0].processingTimeLeft <= 0) {
                const customer = queue.shift();
                queueLen--;
                let customerWaitingTime = curTime - (customer.arrivedAt + customer.processingTimeRequired - 1);
                if (customerWaitingTime > 0 && false) {
                    console.log("Waiting time is more than 0");
                    console.log(JSON.stringify({
                        customer,
                        customerWaitingTime,
                        curTime,
                        queueLen,
                        maxQueueLen
                    }, null, 2));
                }
                if (customerWaitingTime < 0) {
                    console.log("Waiting time should not be less than zero");
                    console.log(JSON.stringify({
                        customer,
                        customerWaitingTime,
                        curTime
                    }, null, 2));
                    process.exit()
                }
                avgWaitingTime = ((avgWaitingTime * noOfCustomerServed) + customerWaitingTime) / (noOfCustomerServed + 1);
                noOfCustomerServed++;
                maxWaitingTime = maxWaitingTime < customerWaitingTime ? customerWaitingTime : maxWaitingTime;
            }
        }

        avgQueueLen = ((avgQueueLen * (curTime - 1)) + queueLen) / curTime;
    }
    return {
        avgWaitingTime,
        maxWaitingTime,
        avgQueueLen,
        maxQueueLen,
        noOfCustomerServed
    }
}

const YAlpha = YBeta = 2;
const RAlpha = RBeta = 0.5;
const BAlpha = 5, BBeta = 1;

const YResult = simulate(3600, YAlpha, YBeta);
const RResult = simulate(3600, RAlpha, RBeta);
const BResult = simulate(3600, BAlpha, BBeta);

const YAvMxDiff = YResult.maxWaitingTime - YResult.avgWaitingTime;
const RAvMxDiff = RResult.maxWaitingTime - RResult.avgWaitingTime;
const BAvMxDiff = BResult.maxWaitingTime - BResult.avgWaitingTime;

const minCustType = YAvMxDiff < RAvMxDiff ? YAvMxDiff < BAvMxDiff ? 'Yellow' : 'Blue' : RAvMxDiff < BAvMxDiff ? 'Red' : 'Blue';

console.log('Q1. Given only yellow customers, what are the average and Maximum customer waiting time?');
console.log(`A: average waiting time: ${YResult.avgWaitingTime}, Max waiting time: ${YResult.maxWaitingTime}`);
console.log('Q2. Given only red customers, what are the average and Maximum queue lengths in-front of the teller?');
console.log(`A: average queue length: ${RResult.avgQueueLen}, Max queue length: ${RResult.maxQueueLen}`);
console.log('Q3. which type of customers gives the closest valuebetween  average and Maximum customer waiting time?');
console.log(`A: ${minCustType}`);

/*
github link: https://github.com/chandrakantap/jibblebs
*/