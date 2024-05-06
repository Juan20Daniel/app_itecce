import { ShowFileContentViewModel } from './ShowFileContentViewModel';
import HeaderFileContent from '../headerFileContent/HeaderFileContent';
import ItemsFileContent from '../contentFileContent/ItemsFileContent';
import FooterFileContent from '../footerFileContent/FooterFileContent';
import './showFileContent.css';
const ShowFileContent = () => {
    const { 
        fileContent,
        nameExcel,
        listSelected,
        data,
        elementRef,
        isLoading,
        uploadedFile,
        inserts,
        updates,
        faileds,
        section,
        close,
        loadFile,
        downloadExcel 
    } = ShowFileContentViewModel();
    return (
        <div className='file-content'>
            <HeaderFileContent 
               fileContent={fileContent}
               nameExcel={nameExcel}
               close={close}
            />
            <ItemsFileContent 
                listSelected={listSelected}
                fileContent={fileContent}
                elementRef={elementRef}
                data={data}
            />
            <FooterFileContent 
                uploadedFile={uploadedFile}
                nameExcel={nameExcel}
                inserts={inserts}
                updates={updates}
                faileds={faileds}
                isLoading={isLoading}
                section={section}
                downloadExcel={downloadExcel}
                loadFile={loadFile}
                close={close} 
            />
        </div>
    );
}
export default ShowFileContent;