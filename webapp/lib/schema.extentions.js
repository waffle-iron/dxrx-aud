import { QuestionnaireSchema } from 'meteor/clinical:hl7-resource-questionnaire';
import { CarePlanSchema, CarePlans } from 'meteor/clinical:hl7-resource-careplan';

CarePlanQuestionnaireSchema = new SimpleSchema([
  CarePlanSchema,
  {
    "questionnaire": {
      type: QuestionnaireSchema,
      optional: true
    }
  }
]);
CarePlans.attachSchema( CarePlanQuestionnaireSchema );
