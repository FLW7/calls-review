interface PartnerData {
    id: string;
    name: string;
    phone: string;
}
interface CallResults {
    type: string;
    title: string;
    tooltip: string;
}

export interface ICall {
    abuse: [];
    candidate_id: number;
    candidate_link: string;
    candidate_name: string;
    candidate_vacancy_name: string;
    contact_company: string;
    contact_name: string;
    date: string;
    date_notime: string;
    disconnect_reason: string;
    errors: string[];
    from_extension: string;
    from_number: string;
    from_site: number;
    id: number;
    in_out: number;
    is_skilla: number;
    line_name: string;
    line_number: string;
    partner_data: PartnerData;
    partnership_id: string;
    person_avatar: string;
    person_id: number;
    person_name: string;
    person_surname: string;
    record: string;
    results: CallResults[];
    source: string;
    stages: [];
    status: string;
    time: number;
    to_extension: string;
    to_number: string;
}
