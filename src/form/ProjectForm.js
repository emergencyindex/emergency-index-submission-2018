const blankValidator = (value) => value.length === 0;
const descriptionValidator = (value) => {
  const current_length = value.trim().split(/\s+/).length;
  return current_length > 400 || current_length < 2;
};

const ProjectForm = {
  project_form: {
    items: [
      {
        id: "geographic_loc",
        label: "Geographic Location",
        help: "(city, state) of this place of work:",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "ensemble",
        label: "Ensemble",
        help:
          "",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "venue",
        label: "Venue",
        help: "",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "presenter",
        label: "Presenter",
        help: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "pay",
        label: "Pay",
        help:
          "(total pay for the gig, minus travel, per diem, expenses)",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "services_num",
        label: "Number of Services",
        help:
          '(Rehearsals+Performances, if commission write "commission")',
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "services_avg",
        label: "Average Length of Services",
        help:
          "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "contract",
        label: "Was there a contract?",
        help:
          '',
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "gig_type",
        label: "Was this gig W2, 1099, or neither?",
        help:
          "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "gig_union",
        label: "Was this a Union gig?",
        help: "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "paid_on_time",
        label: "Were you paid on time as per your agreement with your employer? If no formal agreement was made, were you paid within a reasonable period of time?",
        help:
          "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "per_diem",
        label:
          "Were you paid a per diem? If so, how much?",
        help:
          "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },
      {
        id: "extra_work",
        label: "Were you asked to do extra work that you were not compensated for (contracting, social media outreach, cartage, taking part in Q&A etc.)? If so, please specify.",
        help:
          "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "red_flag",
        label: 'Would you "red flag" this gig?',
        help:
          "",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      }
    ],
    already_submitted: undefined,
    inProgress: undefined 
  }
}

export default ProjectForm
