import type { PageLoad } from "../../museumView/[id]/$types";
import { fetchMuseums, museums, type Museum } from "$lib/accessData";
import { get } from "svelte/store";

export const load: PageLoad = async ({ params }) => {
    await fetchMuseums();

    const museumList = get(museums);
    const index = Number(params.id) - 1;
    const museumData: Museum | null = museumList?.[index] || null;

    return { museum: museumData };
};