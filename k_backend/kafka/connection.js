var kafka = require("kafka-node");
const latestOffset = require("./latest-offset");
// function ConnectionProvider() {
//   this.getConsumer = function (topic_name) {
//     // if (!this.kafkaConsumerConnection) {

//     var loffset;
//     latestOffset.getlatestOffset(topic_name, function (returnValue) {
//       loffset = returnValue;

//       var options = {
//         groupId: "consumers-group",
//         fromOffset: "latest",
//       };

//       this.client = new kafka.KafkaClient(`localhost:2181`);
//       this.kafkaConsumerConnection = new kafka.Consumer(
//         this.client,
//         [{ topic: topic_name, offset: loffset, partition: 0 }],
//         options,
//         {
//           autocommit: false,
//         }
//       );

//       this.client.on("ready", function () {
//         console.log("client ready!");
//       });
//       return this.kafkaConsumerConnection;
//     });

//     // }
//   };

//   //Code will be executed when we start Producer
//   this.getProducer = function () {
//     if (!this.kafkaProducerConnection) {
//       this.client = new kafka.KafkaClient(`localhost:2181`);
//       /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
//                 if (err) {
//                     console.warn('Error refreshing kafka metadata', err);
//                 }
//             });*/
//       var HighLevelProducer = kafka.HighLevelProducer;
//       this.kafkaProducerConnection = new HighLevelProducer(this.client);
//       //this.kafkaConnection = new kafka.Producer(this.client);
//       console.log("producer ready");
//     }
//     return this.kafkaProducerConnection;
//   };
// }

function ConnectionProvider() {
  this.getConsumer = function (topic_name) {
    // if (!this.kafkaConsumerConnection) {
    this.client = new kafka.KafkaClient(`localhost:2181`);

    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 },
    ]);
    this.client.on("ready", function () {
      console.log("client ready!");
    });
    // }
    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.KafkaClient(`localhost:2181`);
      /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
