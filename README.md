# vaccine notifier

## Acceptance Criteria

1. should have option to select state & district
2. select date range
3. show details if slot found.
4. if not found opt in for notification

## flow

1. fetch list of states
2. based on state fetch list of districts
3. parse the response json based on available slots

## tech

ui -> cdn
backend -> lambda
scheduling -> CloudWatch Events
notification -> sns
