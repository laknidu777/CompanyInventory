import axios from 'axios';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default async function BusinessOwners() {
    const response = await axios.get('http://localhost:5000/api/business-owners');
    const businessOwners = response.data;

    return (
        <div>
            <h1>Business Owners</h1>
            <ul>
                {businessOwners.map((owner: { business_owner_id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                    <li key={owner.business_owner_id}>
                        {owner.name} - {owner.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}