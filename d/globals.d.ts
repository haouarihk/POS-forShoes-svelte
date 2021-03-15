declare module "sv-bootstrap-modal" {
    import { SvelteComponentTyped } from 'svelte'
    export interface RouterProps {
        open: boolean;
        // basepath?: string
        // url?: string
    }
    export default class Router extends SvelteComponentTyped<RouterProps> { }

    // export interface RouteProps {
    //     path: string
    //     component?: any
    // }
    // export class Route extends SvelteComponentTyped<RouteProps> {
    // }

    // export interface LinkProps {
    // }
    // export class Link extends SvelteComponentTyped<LinkProps> { }

    // export function navigate<T = {}>(
    //     path: string,
    //     options?: {
    //         replace?: boolean
    //         state?: T
    //     }
    // ): void

    export function link(node: Element): { destroy(): void }
}