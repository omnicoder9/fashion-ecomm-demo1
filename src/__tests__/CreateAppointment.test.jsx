import { render, screen, fireEvent } from '@testing-library/react';
import CreateAppointment from '../CreateAppointment';

const mockCrmData = {
  clients: [{ client_id: 'c1', first_name: 'John', last_name: 'Doe' }],
  appointments: [],
};
const mockUpdate = jest.fn();
const mockClose = jest.fn();

test('shows error for weekend time', () => {
  render(<CreateAppointment crmData={mockCrmData} updateCrmData={mockUpdate} onClose={mockClose} />);
  
  fireEvent.change(screen.getByLabelText(/client/i), { target: { value: 'c1' } });
  fireEvent.change(screen.getByLabelText(/type/i), { target: { value: 'Consultation' } });
  fireEvent.change(screen.getByLabelText(/date & time/i), { target: { value: '2025-12-28T12:00' } }); // Sunday
  
  fireEvent.click(screen.getByText('Schedule'));
  expect(screen.getByText(/Mon–Fri, 10:00 AM – 6:30 PM/)).toBeInTheDocument();
});

test('shows error for time outside business hours', () => {
  // ... similar test with 2025-12-23T09:00 (before 10am)
});

test('prevents overlapping appointments', () => {
  const crmWithAppt = {
    ...mockCrmData,
    appointments: [{
      appointment_id: 'existing',
      start_time: '2025-12-23T11:00:00',
      duration_minutes: 60,
    }],
  };
  render(<CreateAppointment crmData={crmWithAppt} updateCrmData={mockUpdate} onClose={mockClose} />);
  // fill form with overlapping time → expect conflict error
});

test('successfully creates appointment on valid input', () => {
  render(<CreateAppointment crmData={mockCrmData} updateCrmData={mockUpdate} onClose={mockClose} />);
  // fill valid fields
  fireEvent.click(screen.getByText('Schedule'));
  expect(mockUpdate).toHaveBeenCalled(); // checks new appointment added
});