import { AnalyticsEvent,  AnalyticsEventInterface } from '../AnalyticsEvent';


export class AnalyticsEventSessionStart extends AnalyticsEvent<AnalyticsEventSessionStartData> {

  constructor(initializer: AnalyticsEventInterface, data: AnalyticsEventSessionStartData) {
    super(initializer, data);
  }
}

export type AnalyticsEventSessionStartData = {
  key: string;
}
