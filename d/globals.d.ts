declare module "sv-bootstrap-modal" {
    import { SvelteComponentTyped } from 'svelte'
    export interface RouterProps {
        open: boolean;
    }
    export default class Router extends SvelteComponentTyped<RouterProps> { }

    export function link(node: Element): { destroy(): void }
}