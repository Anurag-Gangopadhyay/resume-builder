import React, { useState } from 'react';
import ResumePreview from './components/ResumePreview';
import ResumeTemplate2 from './components/ResumeTemplate2';
import ResumeTemplate3 from './components/ResumeTemplate3';
import FormSection from './components/FormSection';
import TemplateSelector from './components/TemplateSelector';

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
	linked_in: '',
	github: '',
	website: '',
    profile: '',
    education: [{ degree: '', school: '', year: '' }],
    experience: [{ role: '', company: '', duration: '', description: '' }],
    projects: [{ name: '', description: '' }],
    skills: '',
    languages: ''
  });

  const templates = {
    template1: ResumePreview,
    template2: ResumeTemplate2,
    template3: ResumeTemplate3
  };
  const SelectedTemplate = templates[selectedTemplate] || ResumePreview;

  return (
    <div>
      {/* Template Selector at the top */}
      <TemplateSelector selected={selectedTemplate} setSelected={setSelectedTemplate} />

      {/* Main layout with form and preview side-by-side */}
      <div className="app-container" style={{ display: 'flex', gap: '20px' }}>
        <div className="card form-card">
          <FormSection formData={formData} setFormData={setFormData} />
        </div>

        <div className="card preview-card">
          <SelectedTemplate formData={formData} />
        </div>
      </div>
    </div>
  );
}
