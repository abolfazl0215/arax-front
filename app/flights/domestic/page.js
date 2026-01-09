/**
 * Domestic Flights Page
 * Redirects to main flights page
 */

import { redirect } from 'next/navigation';

export default function DomesticFlightsPage() {
  redirect('/flights');
}

