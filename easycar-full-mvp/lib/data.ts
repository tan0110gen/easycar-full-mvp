export const MAKES: Record<string, string[]> = {
  Toyota: ['Camry','Corolla','RAV4','Prius','Highlander','Tacoma'],
  Honda: ['Civic','Accord','CR‑V','Fit','Pilot'],
  Tesla: ['Model 3','Model Y','Model S','Model X'],
  Ford: ['F‑150','Mustang','Escape','Explorer','Focus'],
  Chevrolet: ['Silverado','Malibu','Equinox','Camaro','Bolt'],
  BMW: ['3 Series','5 Series','X3','X5','4 Series'],
  Mercedes: ['C‑Class','E‑Class','GLC','GLE','A‑Class'],
  Nissan: ['Altima','Rogue','Sentra','Pathfinder'],
  Hyundai: ['Elantra','Sonata','Tucson','Santa Fe'],
  Kia: ['Forte','Optima','Sportage','Sorento']
};
export const YEARS = Array.from({length: 2026-2000}, (_,i)=>2000+i).reverse();
export const CITIES = [
  'Los Angeles, CA','Burbank, CA','Santa Monica, CA','San Diego, CA','San Jose, CA','San Francisco, CA','Sacramento, CA',
  'New York, NY','Miami, FL','Orlando, FL','Tampa, FL','Dallas, TX','Austin, TX','Houston, TX','San Antonio, TX',
  'Phoenix, AZ','Seattle, WA','Portland, OR','Chicago, IL','Boston, MA','Denver, CO','Las Vegas, NV','Atlanta, GA','Philadelphia, PA','Washington, DC'
];
