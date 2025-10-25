$(document).ready(function() {

    const initialApps = [
        { 
            name: 'Gemini', 
            developer: 'Google', 
            field: 'Chatbot', 
            isFree: true, 
            url: 'https://gemini.google.com/', 
            description: 'مساعد ذكاء اصطناعي تجريبي من جوجل، مصمم ليكون شريكك الإبداعي.',
            icon: 'https://logos-world.net/wp-content/uploads/2023/12/Gemini-Logo.png',
            uiImage: 'https://miro.medium.com/v2/resize:fit:1400/1*_1h2Vf9S81xKqOLh1QehqA.png'
        },
        { 
            name: 'ChatGPT', 
            developer: 'OpenAI', 
            field: 'Chatbot', 
            isFree: true, 
            url: 'https://chat.openai.com/', 
            description: 'نموذج لغوي محادثة متقدم يمكنه إنشاء نصوص والرد على الأسئلة.',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/240px-ChatGPT_logo.svg.png',
            uiImage: 'https://miro.medium.com/v2/resize:fit:1400/1*PpGdPp_9rD9AbLk60p7hWw.png'
        },
        { 
            name: 'Copilot', 
            developer: 'Microsoft', 
            field: 'Coding Assistant', 
            isFree: true, 
            url: 'https://copilot.microsoft.com/', 
            description: 'مساعد ذكاء اصطناعي مدمج في منتجات مايكروسوفت للمساعدة في البرمجة والمهام اليومية.',
            icon: 'https://blogs.microsoft.com/wp-content/uploads/prod/2023/03/Microsoft-365-Copilot-Icon-960x540.jpg',
            uiImage: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RW18U3a'
        },
        { 
            name: 'DeepSeek', 
            developer: 'DeepSeek', 
            field: 'Coding Assistant', 
            isFree: true, 
            url: 'https://chat.deepseek.com/', 
            description: 'نموذج ذكاء اصطناعي متخصص في كتابة وفهم الأكواد البرمجية.',
            icon: 'https://static-00.iconduck.com/assets.00/deepseek-icon-2048x2048-beblqyr7.png',
            uiImage: 'https://imageio.forbes.com/specials-images/imageserve/651f16c3b00c20b9d12d8c65/0x0.jpg'
        },
        { 
            name: 'QwenChat', 
            developer: 'AlibabaCloud', 
            field: 'Chatbot', 
            isFree: true, 
            url: 'https://tongyi.aliyun.com/qianwen/', 
            description: 'نموذج لغوي كبير تم تطويره بواسطة علي بابا كلاود، يدعم اللغتين الصينية والإنجليزية.',
            icon: 'https://img.alicdn.com/imgextra/i4/O1CN01L3QZQp1l3wY9Y9Y9Y_!!6000000004765-2-tps-200-200.png',
            uiImage: 'https://techcommunity.microsoft.com/t5/image/serverpage/image-id/466262i97F78F5A5A6A0A0F'
        }
    ];

    if (window.location.pathname.endsWith('apps.html')) {
        let apps = JSON.parse(localStorage.getItem('appList'));
        if (!apps || apps.length === 0) {
            apps = initialApps;
            localStorage.setItem('appList', JSON.stringify(apps));
        }

        const tableBody = $('#apps-table-body');
        tableBody.empty();
        
        apps.forEach(app => {
            const freeText = app.isFree ? 'نعم' : 'لا';
            
            const appRow = `
                <tr>
                    <td>${app.name}</td>
                    <td>${app.developer}</td>
                    <td>${app.field}</td>
                    <td>${freeText}</td>
                    <td><input type="checkbox" class="details-checkbox"></td>
                </tr>`;
            
            const detailsRow = `
                <tr class="details-row" style="display: none;">
                    <td colspan="5">
                        <div class="details-content">
                            <img src="${app.icon || 'https://via.placeholder.com/50'}" alt="${app.name} Icon" class="icon">
                            <div class="details-text">
                                <p><b>شرح مختصر:</b> ${app.description}</p>
                                <p><b>الموقع الإلكتروني:</b> <a href="${app.url}" target="_blank">${app.url}</a></p>
                            </div>
                            <img src="${app.uiImage || 'https://via.placeholder.com/200x150'}" alt="${app.name} UI" class="ui-image">
                        </div>
                    </td>
                </tr>`;
                
            tableBody.append(appRow + detailsRow);
        });

        tableBody.on('change', '.details-checkbox', function() {
            $(this).closest('tr').next('.details-row').toggle(this.checked);
        });
    }

    if (window.location.pathname.endsWith('add_app.html')) {
        $('#add-app-form').on('submit', function(event) {
            event.preventDefault();

            const appName = $('#appName').val().trim();
            const devName = $('#devName').val().trim();
            
            const appNameRegex = /^[A-Za-z]+$/;
            if (!appNameRegex.test(appName)) {
                alert("خطأ: اسم التطبيق يجب أن يحتوي على أحرف إنجليزية فقط وبدون فراغات.");
                return;
            }
            
            const devNameRegex = /^[A-Za-z0-9]+$/;
            if (!devNameRegex.test(devName)) {
                alert("خطأ: اسم الشركة المصنعة يجب أن يحتوي على أحرف إنجليزية أو أرقام.");
                return;
            }

            const newApp = {
                name: appName,
                developer: devName,
                url: $('#website').val().trim(),
                isFree: $('#isFree').is(':checked'),
                field: $('#field').val(),
                description: $('#description').val(),
                icon: 'https://via.placeholder.com/50',
                uiImage: 'https://via.placeholder.com/200x150'
            };
            
            let apps = JSON.parse(localStorage.getItem('appList')) || [];
            apps.push(newApp);
            localStorage.setItem('appList', JSON.stringify(apps));
            
            alert("تمت إضافة التطبيق بنجاح!");
            window.location.href = 'apps.html';
        });
    }
});