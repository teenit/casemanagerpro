import { Button } from "@mui/material";
import React, { useRef } from "react";
import withMarkBackImg from './../../../img/back-pdf-with-mark.png';

const CaseLikePDF = ({ caseData }) => {
    const pdfRef = useRef();

    if (!caseData) {
        return <p>Дані відсутні</p>;
    }

    const caseProfilePhoto = caseData?.meta?.profileImg?.link?.link || null;
    const { phone1, phone2, middle_name, first_name, last_name, id: case_id, email, happy_bd } = caseData.general;
    const { potreba, history, family_info, comment } = caseData.data;
    const name = `${middle_name || ""} ${first_name || ""} ${last_name || ""}`.trim();
    const markImg = false;

    const handlePrint = () => {
        const printContent = pdfRef.current; // Отримуємо область друку
        const WindowPrint = window.open("", "_blank", "width=800,height=600");
      
        WindowPrint.document.open(); // Відкриваємо документ
        WindowPrint.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Case Manager Pro</title>
            <style>
              @media print {
                body {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                  font-family: Arial, sans-serif;
                }
                .print-area {
                  width: 100%;
                  page-break-inside: avoid;
                  background: url(${withMarkBackImg});
                }
                .page {
                  page-break-after: always;
                }
                .page:last-child {
                  page-break-after: auto;
                }
                .mark {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    width: 100wh;
                    height: 100vh;
                    transform: scale(1.3);

                }
                .CaseLikePDF {
                  box-shadow: 0 0 0 1px #000;
                  display: grid;
                  grid-template-columns: 250px 1fr;
                  gap: 25px;
                }
                .photo img {
                  width: 100%;
                }
                .CaseLikePDF-block .title {
                  font-size: 22px;
                  font-weight: 600;
                }
                .CaseLikePDF-block .description {
                  font-size: 18px;
                  margin-top: 15px;
                }
                .CaseLikePDF-left, .CaseLikePDF-right {
                  display: flex;
                  flex-direction: column;
                  gap: 50px;
                }
                

                /* Нижній колонтитул */
                .footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    text-align: center;
                    font-size: 12px;
                    background: #555000;
                    border-top: 1px solid #ccc;
                    padding: 5px 0;
                }
              }

            </style>
          </head>
          <body>
            <div class="print-area">
            <img class="mark" src="${markImg ? withMarkBackImg : ""}"/>
              ${printContent.outerHTML}
            </div>
              <footer class="footer">
                © 2024 My Company - Page printed from our system.
            </footer>
          </body>
          </html>
        `);
      
        WindowPrint.document.close(); // Закриваємо документ для рендерингу
      
        // Перевіряємо завантаження всіх зображень перед друком
        const images = WindowPrint.document.querySelectorAll("img");
        const imageLoadPromises = Array.from(images).map((img) => {
          return new Promise((resolve, reject) => {
            if (img.complete) resolve();
            img.onload = resolve;
            img.onerror = reject;
          });
        });
      
        Promise.all(imageLoadPromises)
          .then(() => {
            WindowPrint.focus(); // Фокусуємо вікно
            WindowPrint.print(); // Виконуємо друк
            WindowPrint.close(); // Закриваємо вікно після друку
          })
          .catch((error) => {
            console.error("Помилка завантаження зображень:", error);
            WindowPrint.close();
          });
      };
      

    return (
        <>
            <Button onClick={handlePrint}>Друк</Button>
            <div ref={pdfRef} className="CaseLikePDF print-area">
                <div className="CaseLikePDF-left">
                    {caseProfilePhoto && (
                        <div className="photo">
                            <img
                                src={caseProfilePhoto}
                                alt="Профіль"
                                onError={() => alert("Не вдалося завантажити зображення")}
                            />
                        </div>
                    )}
                    <div className="CaseLikePDF-block">
                        <div className="title">#{case_id} {name}</div>
                        
                    </div>
                    <div className="CaseLikePDF-block">
                        <div className="title">Дата народження</div>
                        <div className="description">{happy_bd ? happy_bd : "Не вказано"}</div>
                    </div>
                    {(phone1 || phone2 || email) && <div className="CaseLikePDF-block">
                        <div className="title">Контактні дані</div>
                        <div className="description">
                            <ul>
                                {phone1 && <li>Тел. {phone1}</li>}
                                {phone2 && <li>Тел. {phone2}</li>}
                                {email && <li>Email {email}</li>}
                            </ul>
                        </div>
                    </div>}
                </div>
                <div className="CaseLikePDF-right">
                    <div className="CaseLikePDF-block">
                        <div className="title">Сімейний стан</div>
                        <div className="description">{family_info ? family_info : "Не вказано"}</div>
                    </div>
                    <div className="CaseLikePDF-block">
                        <div className="title">Потреба / запит</div>
                        <div className="description">{potreba ? potreba : "Не вказано"}</div>
                    </div>
                    <div className="CaseLikePDF-block">
                        <div className="title">Історія сім'ї / особи</div>
                        <div className="description">{history ? history : "Не вказано"}</div>
                    </div>
                    <div className="CaseLikePDF-block">
                        <div className="title">Коментар</div>
                        <div className="description">{comment ? comment : "Не вказано"}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CaseLikePDF;
