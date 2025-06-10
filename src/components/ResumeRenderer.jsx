// ResumeRenderer.jsx
import ResumePreview from './ResumePreview';
import ResumeTemplate2 from './ResumeTemplate2';
import ResumeTemplate3 from './ResumeTemplate3';

export default function ResumeRenderer({ formData, selectedTemplate }) {
  const templates = {
    'template1': ResumePreview,
    'template2': ResumeTemplate2,
	'template3': ResumeTemplate3
  };

  const SelectedTemplate = templates[selectedTemplate] || ResumePreview;

  return <SelectedTemplate formData={formData} />;
}
