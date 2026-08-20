'use server';

export async function submitContactForm(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string | null;
    const inquiry = formData.get('inquiry') as string;

    if (!name || !email || !inquiry) {
      return { success: false, error: 'Name, Email, and Inquiry are required.' };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const response = await fetch(`${apiUrl}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, inquiry }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit');
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Failed to submit the form. Please try again later.' };
  }
}
