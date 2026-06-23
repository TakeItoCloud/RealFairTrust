export interface PropertyCardProps {
  /** Photo URL (warm-toned architecture). Falls back to a navy gradient. */
  image?: string;
  /** Pre-formatted price string, e.g. "€ 720 000". */
  price: string;
  /** Optional suffix shown smaller after the price, e.g. "/mês". */
  priceSuffix?: string;
  title: string;
  location: string;
  deal?: "sale" | "rent";
  beds?: number;
  baths?: number;
  /** Floor area in m². */
  area?: number;
  /** Energy certificate, e.g. "A+". Rendered in verified-green. */
  energy?: string;
  /** Show the "Dados de demonstração" badge. Default true. */
  demo?: boolean;
  /** Listing consultant — ties the property to a ranked agent. */
  agentName?: string;
  agentPhoto?: string;
  /** Detail-link label. Defaults to "Ver detalhe". */
  detailLabel?: string;
}

/**
 * A property listing tile — warm photo, gold Fraunces price, specs, and the
 * consultant attribution that links every listing to a ranked agent.
 * @startingPoint section="Marketplace" subtitle="Property listing tile" viewport="700x420"
 */
export function PropertyCard(props: PropertyCardProps): JSX.Element;
