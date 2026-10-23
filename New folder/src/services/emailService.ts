import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, BRAND_CONFIG } from '../data/config';
import { ContactFormData } from '../types';

export interface SendEmailResult {
  success: boolean;
  provider: 'emailjs' | 'formsubmit' | 'local_only';
  message: string;
}

/**
 * Sends a real-time lead notification directly to Harsh's Gmail via EmailJS
 * using the configured credentials, with FormSubmit as an automated fallback.
 */
export async function sendLeadNotification(formData: ContactFormData): Promise<SendEmailResult> {
  const serviceId = localStorage.getItem('hexathumb_emailjs_service_id') || EMAILJS_CONFIG.serviceId;
  const templateId = localStorage.getItem('hexathumb_emailjs_template_id') || EMAILJS_CONFIG.templateId;
  const publicKey = localStorage.getItem('hexathumb_emailjs_public_key') || EMAILJS_CONFIG.publicKey;
  const targetEmail =
    localStorage.getItem('hexathumb_owner_email') || BRAND_CONFIG.contactEmail || EMAILJS_CONFIG.targetGmail;

  // Provide every commonly used template parameter variable name so any EmailJS template matches
  const templateParams: Record<string, string> = {
    // Sender details
    from_name: formData.fullName,
    name: formData.fullName,
    user_name: formData.fullName,
    client_name: formData.fullName,
    fullName: formData.fullName,

    // Email fields
    reply_to: formData.email,
    email: formData.email,
    user_email: formData.email,
    from_email: formData.email,
    client_email: formData.email,

    // Contact info
    phone: formData.whatsappNumber || 'Not provided',
    whatsapp: formData.whatsappNumber || 'Not provided',
    whatsapp_number: formData.whatsappNumber || 'Not provided',
    preferred_contact: formData.preferredContact,
    contact_method: formData.preferredContact,

    // Project brief
    project_type: formData.projectType,
    service: formData.projectType,
    budget: formData.budgetRange || 'Flexible',
    budget_range: formData.budgetRange || 'Flexible',
    message: formData.projectDescription,
    project_description: formData.projectDescription,
    project_brief: formData.projectDescription,

    // Recipient & Metadata
    to_name: 'Harsh (HEXATHUMB)',
    to_email: targetEmail,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toLocaleString(),
  };

  // 1. Primary: EmailJS Browser SDK
  try {
    const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
    if (response.status === 200 || response.text === 'OK') {
      return {
        success: true,
        provider: 'emailjs',
        message: 'Notification delivered instantly to your Gmail inbox via EmailJS!',
      };
    }
  } catch (sdkError: any) {
    console.warn('EmailJS SDK attempt note:', sdkError);

    // 1b. Direct REST fetch to EmailJS API in case SDK had environment issues
    try {
      const restResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: templateParams,
        }),
      });

      if (restResponse.ok) {
        return {
          success: true,
          provider: 'emailjs',
          message: 'Notification delivered to your Gmail inbox via EmailJS REST API!',
        };
      }
    } catch (restError) {
      console.warn('Direct EmailJS REST fetch note:', restError);
    }
  }

  // 2. Secondary fallback: FormSubmit free email router
  try {
    const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `New HEXA Portfolio Inquiry: ${formData.fullName} (${formData.projectType})`,
        _template: 'table',
        _captcha: 'false',
        'Client Name': formData.fullName,
        'Client Email': formData.email,
        'WhatsApp Number': formData.whatsappNumber || 'Not provided',
        'Project Type': formData.projectType,
        'Estimated Budget': formData.budgetRange || 'Flexible',
        'Preferred Contact': formData.preferredContact,
        'Project Brief': formData.projectDescription,
        Timestamp: new Date().toLocaleString(),
      }),
    });

    if (fallbackResponse.ok) {
      return {
        success: true,
        provider: 'formsubmit',
        message: 'Notification sent to Gmail via fallback gateway.',
      };
    }
  } catch (fallbackError) {
    console.warn('FormSubmit fallback notice:', fallbackError);
  }

  return {
    success: true,
    provider: 'local_only',
    message: 'Inquiry saved in your local dashboard inquiries archive.',
  };
}

/**
 * Sends a live test email through EmailJS to verify connection
 */
export async function sendTestEmailJS(params?: {
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
  targetEmail?: string;
}): Promise<{ success: boolean; message: string; provider: string }> {
  const serviceId = params?.serviceId || localStorage.getItem('hexa_emailjs_service_id') || EMAILJS_CONFIG.serviceId;
  const templateId = params?.templateId || localStorage.getItem('hexa_emailjs_template_id') || EMAILJS_CONFIG.templateId;
  const publicKey = params?.publicKey || localStorage.getItem('hexa_emailjs_public_key') || EMAILJS_CONFIG.publicKey;
  const targetEmail =
    params?.targetEmail ||
    localStorage.getItem('hexa_owner_email') ||
    BRAND_CONFIG.contactEmail ||
    EMAILJS_CONFIG.targetGmail;

  const testParams: Record<string, string> = {
    from_name: 'HEXA Website System (Test Lead)',
    name: 'Harsh Singh (HEXA Test Lead)',
    user_name: 'HEXA Test Client',
    client_name: 'HEXA Test Client',
    reply_to: targetEmail,
    email: targetEmail,
    user_email: targetEmail,
    from_email: targetEmail,
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    project_type: 'YouTube Thumbnail Design (Test Lead)',
    budget: '$50 - $100',
    message: '🎉 Congratulations Harsh! Your HEXA portfolio is now officially connected to EmailJS. All future client inquiries will arrive directly in your Gmail inbox.',
    project_description: '🎉 Congratulations Harsh! Your HEXA portfolio is now officially connected to EmailJS. All future client inquiries will arrive directly in your Gmail inbox.',
    to_name: 'Harsh Singh',
    to_email: targetEmail,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    timestamp: new Date().toLocaleString(),
  };

  try {
    const res = await emailjs.send(serviceId, templateId, testParams, publicKey);
    if (res.status === 200 || res.text === 'OK') {
      return {
        success: true,
        provider: 'EmailJS',
        message: `Success! Test email sent via EmailJS to ${targetEmail}. Check your Gmail inbox (and Spam/Updates folder)!`,
      };
    }
  } catch (err: any) {
    // Try REST fallback
    try {
      const rest = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: testParams,
        }),
      });
      if (rest.ok) {
        return {
          success: true,
          provider: 'EmailJS REST',
          message: `Success! Test email dispatched via EmailJS REST API to ${targetEmail}!`,
        };
      }
    } catch {
      // Fall through to error
    }

    return {
      success: false,
      provider: 'EmailJS',
      message: `EmailJS responded with: ${err?.text || err?.message || 'Check your Service ID / Template ID / Public Key settings.'}`,
    };
  }

  return {
    success: false,
    provider: 'EmailJS',
    message: 'Could not send test email. Please check your credentials.',
  };
}
