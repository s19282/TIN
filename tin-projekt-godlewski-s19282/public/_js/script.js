function changeFooter()
{
    let paragraph = document.getElementsByTagName('footer')[0];
    paragraph.innerText = "Copyright ©, s19282, Godlewski, Mateusz";
    setTimeout(function (){paragraph.innerText = "Mateusz, Godlewski, s19282, Copyright ©";},1000);
}