# vaccine notifier

Application to get notified when vaccine is available in an area.

Uses the serverless framework to easily test and deploy as AWS lambdas.


## Run instructions

```
npm i

sls offline start
```

To deploy:

```
sls deploy
```

Make sure to have the aws credentials setup in the ~/.aws/config file.

## TODO

scheduling -> CloudWatch Events
notification -> sns
