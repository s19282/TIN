import React from "react";
import OwnerListTableRow from "./OwnerListTableRow_";
import { useTranslation } from 'react-i18next';

function OwnerListTable(props)
{
    const owners = props.ownerList;
    const { t } = useTranslation();

    return (
        <table className="table-list">
            <thead>
                <tr>
                    <th>{t('owner.fields.firstName')}</th>
                    <th>{t('owner.fields.lastName')}</th>
                    <th>{t('owner.fields.email')}</th>
                    <th>{t('owner.fields.phoneNumber')}</th>
                    <th>{t('list.actions.title')}</th>
                </tr>
            </thead>
            <tbody>
            {owners.map(owner =>
                <OwnerListTableRow ownerData={owner} key={owner.id}/>
            )}
            </tbody>
        </table>
    )
}
export default OwnerListTable