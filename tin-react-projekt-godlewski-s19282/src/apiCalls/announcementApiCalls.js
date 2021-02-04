import {getCurrentUser} from "../helpers/authHelper";

const announcementsBaseUrl = 'http://localhost:3000/api/announcements';

export function getAnnouncementsApiCall() {
    const user = getCurrentUser()
    let token;
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(announcementsBaseUrl,options);
}
export function getAnnouncementsApiCallAdmin() {
    const user = getCurrentUser()
    let token;
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(announcementsBaseUrl+"/admin",options);
}
export function getAnnouncementByIdApiCall(announcementId)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(`${announcementsBaseUrl}/${announcementId}`,options);
}
export function addAnnouncementApiCall(announcement)
{
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const announcementString = JSON.stringify(announcement)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: announcementString
    }
    return fetch(announcementsBaseUrl, options)
}

export function updateAnnouncementApiCall(announcementId,announcement){
    const url = `${announcementsBaseUrl}/${announcementId}`
    const user = getCurrentUser()
    let token
    if (user && user.token) {
        token = user.token
    }
    const announcementString = JSON.stringify(announcement)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: announcementString
    }
    return fetch(url, options)
}
export function deleteAnnouncementApiCall(announcementId){
    const url = `${announcementsBaseUrl}/${announcementId}`
    const user = getCurrentUser()
    let token
    if (user && user.token)
        token = user.token

    const options =
    {
        method: 'DELETE',
        headers:
        {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(url, options)
}