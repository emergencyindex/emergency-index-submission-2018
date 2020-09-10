const blankValidator = (value) => value.length === 0;
const descriptionValidator = (value) => {
  const current_length = value.trim().split(/\s+/).length;
  return current_length > 400 || current_length < 2;
};

const ProjectForm = {
  project_form: {
    items: [
      {
        id: "contact_name",
        label: "CONTACT NAME",
        help: "This will not be published.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "contact_email",
        label: "CONTACT EMAIL",
        help:
          "Email address of person submitting this form. This will not be published, but we will use it to contact you. Please enter an email that you check regularly. If you make a typo here, we will not be able to contact you, ever.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "contact_phone",
        label: "CONTACT PHONE NUMBER",
        help: "This will not be published. A phone number is required.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "title",
        label: "TITLE OF PIECE",
        help: "This will be printed in all caps in the heading of the work, however we will use American Title Capitalization style for the body of the text, unless there is unusual capitalization indicated here.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "contributor",
        label: "NAME(S) OF CREATOR(S) OR GROUP",
        help:
          "This will be the byline. If more than one author, please separate by commas. Please don't use this field for other collaborators and participants; there will be a field below for them. ",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "collaborators",
        label: "Name(s) of Other Collaborators",
        help:
          "This will appear as a sub-byline. Please only list key collaborators; do not include sponsoring and producing institutions, curators, festivals, audience participants, etc. (if absolutely necessary, these specifics can be included at the end of your performance description). Because space is limited, please do NOT include the roles of the key collaborators; e.g., (composer) Bjork.",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "date_first_performed",
        label: "Date of First Performance",
        help:
          "If the performance was durational, indicate the start date. ***IF THE FIRST PERFORMANCE OF YOUR WORK PRECEDED JANUARY 1, 2018, IT CANNOT BE ACCEPTED.***",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "times_performed",
        label: "How many times was it performed in 2018?",
        help:
          'Please type a number.',
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "venue",
        label: "Venue where the first performance occurred.",
        help:
          "e.g., Grace Exhibition Space. If the venue is not a traditional performance venue, please try to specify where it was; e.g., a street in Times Square; the artist's studio; Mount Everest, etc.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "city",
        label: "City where the first performance occurred.",
        help: "",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "state_country",
        label: "Country (or state) where the first performance occurred.",
        help:
          "If within US, list the state instead of the country: e.g., California. If outside US, list the country: e.g., Vietnam.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      },{
        id: "home",
        label:
          "Where are the creators based? (to be published; optional)",
        help:
          'Listing your base can help local audiences find you. Please list City, State (if in the US), and Country (if outside of the US). If the creator lives in multiple cities, use "&": e.g., Brooklyn, NY & Tokyo, Japan. If group members are based in different cities, use slashes: e.g., New York, NY / Tokyo, Japan / Paris, France.',
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },
      {
        id: "published_contact",
        label: "Creator/Group contact email (to be published; optional)",
        help:
          "We cannot include more than one email address.",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "links",
        label: "Creator/Group website (to be published; optional)",
        help:
          "We cannot include more than one website.",
        value: "",
        required: false,
        error: false,
        validator: blankValidator
      },{
        id: "description",
        label: "Description of performance",
        help:
          'The description may not exceed 400 words; if it does it will be discarded and your submission will not be read. Because INDEX includes many different genres of performance, your description *must* include an explanation of the purpose of the work, the problematic the performance was made to address, or the context to which the work responded. The description of the performance itself should give the reader a sense of what happened, with particular focus on the way the work dealt with the challenges at hand... Note that performance titles should be in quotes, while film and book titles should be italicized. (Please use asterisks to indicate italics where necessary); e.g. “Of Mice and Mice” was a mash-up of Steinbeck’s *Of Mice and Men* and the 1939 film *Gone with the Wind*. Generally, we encourage you to use the first-person "I" and "we" instead of the third-person "the artist."',
        value: "",
        required: true,
        error: false,
        validator: descriptionValidator
      },{
        id: "photo_credit",
        label: "Image Credit",
        help:
          "Please enter the name of the person the photo/image should be credited to.",
        value: "",
        required: true,
        error: false,
        validator: blankValidator
      }
    ],
    already_submitted: undefined,
    inProgress: undefined 
  },
  image_help: "It should not be a flier, poster, or promotional material. You must have all permissions to publish the image. The published image will be 5x7 (portrait or landscape orientation) and black & white (grayscale). We will adjust any image sent to this format, cropping if necessary. Please deliver files in the highest resolution possible at a minimum 300 DPI at 5x7 inches or 1500 x 2100 pixels. JPEG or TIFF files preferred",
  already_submitted_help: "Have you, or any of the people named above, already submitted a performance for this volume of Emergency Index?"
}

export default ProjectForm
