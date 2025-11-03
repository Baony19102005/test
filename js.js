
// Đợi cho toàn bộ nội dung của trang web được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', function () {

    // Lấy ra các phần tử cần tương tác
    const contentArea = document.getElementById('part-c');
    const aboutMeBtn = document.getElementById('about-me-btn');
    const productsBtn = document.getElementById('products-btn');
    const weatherBtn = document.getElementById('weather-btn');
    const rssBtn = document.getElementById('rss-btn');
    // employees-btn nằm trong dropdown nên lấy sau khi DOM sẵn sàng
    const employeesBtn = document.getElementById('employees-btn');

    if (employeesBtn) {
        employeesBtn.addEventListener('click', function (event) {
            event.preventDefault();
            showEmployees();
        });
    } else {
        console.warn('Warning: element with id "employees-btn" not found inside DOMContentLoaded.');
    }

    // --- CHỨC NĂNG CHO CÂU HỎI 2 (Q2) ---
    // TÌM HÀM NÀY TRONG FILE SCRIPT.JS VÀ THAY THẾ NÓ

    function showAboutMe() {
        // Tạo cấu trúc HTML mới cho thông tin sinh viên dạng bảng
        const studentProfileHTML = `
        <div class="student-profile-card" style="animation: fadeIn 0.5s ease;">
            <img src="../CSS/baony.jpg" alt="Avatar" class="profile-avatar">
            
            <table class="info-table">
                <tbody>
                    <tr>
                        <th>Student Name</th>
                        <td>Nguyễn Thị Bảo Ny</td>
                    </tr>
                    <tr>
                        <th>Student ID</th>
                        <td>K234111359</td>
                    </tr>
                    <tr>
                        <th>Class Name</th>
                        <td>K23411T</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>nyntb23411@st.uel.edu.vn</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>0376968922</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;
        // Hiển thị nội dung mới vào phần C
        contentArea.innerHTML = studentProfileHTML;
    }

    // --- CHỨC NĂNG CHO CÂU HỎI 3 (Q3) ---
    // TÌM HÀM NÀY TRONG FILE SCRIPT.JS VÀ THAY THẾ NÓ

    async function showProducts() {
        // Hiển thị thông báo đang tải...
        contentArea.innerHTML = '<p class="loading-text">Đang tải dữ liệu sản phẩm...</p>';

        try {
            // THAY ĐỔI 1: Lấy dữ liệu từ file "data.xml" cục bộ
            const response = await fetch('data.xml');

            // Kiểm tra xem request có thành công không
            if (!response.ok) {
                throw new Error(`Không tìm thấy file data.xml! Status: ${response.status}`);
            }

            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            // THAY ĐỔI 2: Lấy ra các thẻ <product> (chữ thường)
            const products = xmlDoc.getElementsByTagName('product');

            // Bắt đầu xây dựng bảng HTML mới
            let productsTableHTML = `
            <div class="product-display-card" style="animation: fadeIn 0.5s ease;">
                <h2>Our Products</h2>
                <table class="product-table">
                    <thead>
                        <tr>
                            <th>Hình ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

            // Lặp qua từng sản phẩm để lấy thông tin
            for (let product of products) {
                // THAY ĐỔI 3: Dùng các tên thẻ mới: name, image, detail
                const name = product.getElementsByTagName('name')[0].textContent;
                const detail = product.getElementsByTagName('detail')[0].textContent;
                const imageUrl = product.getElementsByTagName('image')[0].textContent;

                productsTableHTML += `
                <tr>
                    <td class="product-image-cell">
                        <img src="${imageUrl}" alt="${name}" class="product-image">
                    </td>
                    <td class="product-name-cell">${name}</td>
                    <td class="product-detail-cell">${detail}</td>
                </tr>
            `;
            }

            // Đóng bảng
            productsTableHTML += `
                    </tbody>
                </table>
            </div>
        `;

            // Hiển thị bảng vào phần C
            contentArea.innerHTML = productsTableHTML;

        } catch (error) {
            console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
            contentArea.innerHTML = `<p class="error-text">Không thể tải dữ liệu sản phẩm. Hãy chắc chắn rằng file <strong>data.xml</strong> đang nằm cùng thư mục với file HTML và bạn đang dùng <strong>Live Server</strong>.</p>`;
        }
    }
    // --- GÁN SỰ KIỆN CLICK CHO CÁC NÚT MENU ---
    aboutMeBtn.addEventListener('click', function (event) {
        event.preventDefault(); // Ngăn hành vi mặc định của thẻ <a>
        showAboutMe();
    });

    productsBtn.addEventListener('click', function (event) {
        event.preventDefault();
        showProducts();
    });

    // Gán sự kiện cho Weather và RSS bên trong DOMContentLoaded (biến đã được khai báo ở trên)
    if (weatherBtn) {
        weatherBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showWeather();
        });
    }

    if (rssBtn) {
        rssBtn.addEventListener('click', function (e) {
            e.preventDefault();
            showRssFeed();
        });
    }

    // --- MẶC ĐỊNH KHI VỪA VÀO TRANG (YÊU CẦU CỦA Q2) ---
    // Gọi hàm showAboutMe() ngay khi trang vừa tải xong
    showAboutMe();

    // --- GÁN SỰ KIỆN CHO NÚT LOGIN/LOGOUT VÀ CẬP NHẬT TRẠNG THÁI BAN ĐẦU ---
    const loginBtn = document.getElementById('login-logout-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const loggedInUser = localStorage.getItem('loggedInUser');

            if (loggedInUser) {
                if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                    localStorage.removeItem('loggedInUser');
                    updateLoginStatus();
                    alert('Bạn đã đăng xuất thành công.');
                    const aboutBtn = document.getElementById('about-me-btn');
                    if (aboutBtn) aboutBtn.click();
                }
            } else {
                showLoginForm();
            }
        });
    }

    // Cập nhật trạng thái nút Login/Logout khi vừa load xong
    updateLoginStatus();

});
// =======================================================
// === BẮT ĐẦU PHẦN CODE CHO CÂU 4 (EMPLOYEES) ===
// =======================================================

// (employeesBtn is now bound inside DOMContentLoaded)

// Mảng để lưu trữ dữ liệu nhân viên, sẽ được điền từ file JSON
let employeesData = [];

// Hàm 1: Vẽ lại bảng nhân viên ra màn hình
function renderEmployeeTable() {
    const tableContainer = document.getElementById('employee-table-container');
    if (!tableContainer) return; // Nếu không tìm thấy container thì dừng lại

    let tableHTML = `
        <table class="employee-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên</th>
                    <th>Điện thoại</th>
                    <th>Email</th>
                    <th>Tuổi</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Lặp qua mảng dữ liệu nhân viên để tạo từng hàng
    employeesData.forEach(emp => {
        // YÊU CẦU GIAO DIỆN: Kiểm tra tuổi để thêm class màu nền
        const rowClass = (emp.age >= 18 && emp.age <= 35) ? 'age-yellow' : 'age-magenta';

        tableHTML += `
            <tr class="${rowClass}">
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.phone}</td>
                <td>${emp.email}</td>
                <td>${emp.age}</td>
                <td><button class="delete-btn" data-id="${emp.id}">Xóa</button></td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table>`;
    tableContainer.innerHTML = tableHTML;
}

// Hàm 2: Gán các sự kiện cho form (Thêm) và bảng (Xóa)
function attachEmployeeEventListeners() {
    const form = document.getElementById('add-employee-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Ngăn form reload trang

            // Lấy dữ liệu từ các ô input
            const newEmployee = {
                id: document.getElementById('emp-id').value,
                name: document.getElementById('emp-name').value,
                phone: document.getElementById('emp-phone').value,
                email: document.getElementById('emp-email').value,
                age: parseInt(document.getElementById('emp-age').value)
            };

            // Thêm nhân viên mới vào mảng dữ liệu
            employeesData.push(newEmployee);
            // Vẽ lại bảng để hiển thị nhân viên mới
            renderEmployeeTable();
            // Xóa trắng form
            form.reset();
        });
    }

    const tableContainer = document.getElementById('employee-table-container');
    if (tableContainer) {
        tableContainer.addEventListener('click', function (event) {
            // Chỉ thực hiện khi nhấn vào nút có class 'delete-btn'
            if (event.target.classList.contains('delete-btn')) {
                const employeeId = event.target.getAttribute('data-id');

                // YÊU CẦU: Hiển thị hộp thoại xác nhận trước khi xóa
                if (confirm(`Bạn có chắc chắn muốn xóa nhân viên có ID là ${employeeId} không?`)) {
                    // Lọc ra nhân viên cần xóa khỏi mảng
                    employeesData = employeesData.filter(emp => emp.id != employeeId);
                    // Vẽ lại bảng với dữ liệu đã được cập nhật
                    renderEmployeeTable();
                }
            }
        });
    }
}

// Hàm 3: Hàm chính để hiển thị toàn bộ giao diện quản lý nhân viên
async function showEmployees() {
    // Lấy vùng hiển thị chính (an toàn hơn là dùng biến bên ngoài)
    const contentArea = document.getElementById('part-c');

    // Tạo cấu trúc HTML cho form và bảng
    const managerHTML = `
        <div class="employee-manager" style="animation: fadeIn 0.5s ease;">
            <div class="employee-form-container">
                <h3>Thêm nhân viên mới</h3>
                <form id="add-employee-form">
                    <input type="text" id="emp-id" placeholder="ID" required>
                    <input type="text" id="emp-name" placeholder="Họ và tên" required>
                    <input type="tel" id="emp-phone" placeholder="Số điện thoại" required>
                    <input type="email" id="emp-email" placeholder="Email" required>
                    <input type="number" id="emp-age" placeholder="Tuổi" required>
                    <button type="submit">Thêm vào danh sách</button>
                </form>
            </div>
            <div class="employee-list-container">
                <h3>Danh sách nhân viên</h3>
                <div id="employee-table-container"><p class="loading-text">Đang tải dữ liệu...</p></div>
            </div>
        </div>`;
    if (contentArea) contentArea.innerHTML = managerHTML;

    // YÊU CẦU: Tải dữ liệu từ file JSON
    try {
        // Chỉ tải dữ liệu nếu mảng đang rỗng (chỉ tải lần đầu tiên)
        if (employeesData.length === 0) {
            const response = await fetch('employees.json');
            if (!response.ok) {
                throw new Error(`Không tìm thấy file employees.json!`);
            }
            employeesData = await response.json();
        }

        // Sau khi có dữ liệu, hiển thị bảng và gán sự kiện
        renderEmployeeTable();
        attachEmployeeEventListeners();
    } catch (error) {
        console.error("Lỗi khi tải Employees:", error);
        const tableContainer = document.getElementById('employee-table-container');
        if (tableContainer) tableContainer.innerHTML = `<p class="error-text">Không thể tải dữ liệu nhân viên. Hãy kiểm tra lại vị trí file <strong>employees.json</strong>.</p>`;
    }
}

// =======================================================
// === BẮT ĐẦU PHẦN CODE CHO CÂU 5 & 6 (API & RSS) ===
// =======================================================

// --- CHỨC NĂNG CHO CÂU HỎI 5 (WEATHER API) ---

async function showWeather() {
    // Lấy vùng hiển thị chính (an toàn khi hàm được gọi từ nhiều chỗ)
    const contentArea = document.getElementById('part-c');
    if (!contentArea) return console.warn('showWeather: #part-c not found');
    contentArea.innerHTML = '<p class="loading-text">Đang tải dữ liệu thời tiết...</p>';
    
    // Ghi chú: Việc lấy TẤT CẢ tỉnh thành sẽ rất lâu.
    // Ở đây, chúng ta sẽ lấy dữ liệu của một vài thành phố lớn làm ví dụ.
    const cities = ['HaNoi', 'Ho_Chi_Minh_City', 'Da_Nang', 'Can_Tho', 'Hai_Phong'];
    const weatherApiUrl = "https://wttr.in/"; // Một API miễn phí, không cần key

    try {
        // Dùng Promise.all để gọi API cho tất cả các thành phố cùng lúc
        const requests = cities.map(city => fetch(`${weatherApiUrl}${city}?format=j1`));
        const responses = await Promise.all(requests);
        const weatherData = await Promise.all(responses.map(res => res.json()));

        let weatherTableHTML = `
            <div class="weather-container" style="animation: fadeIn 0.5s ease;">
                <h3>Dự báo thời tiết các thành phố lớn</h3>
                <table class="weather-table">
                    <thead>
                        <tr>
                            <th>Tỉnh/Thành phố</th>
                            <th>Nhiệt độ hiện tại</th>
                            <th>Thấp nhất</th>
                            <th>Cao nhất</th>
                            <th>Tình trạng</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        weatherData.forEach(data => {
            const cityName = data.nearest_area[0].areaName[0].value.replace(/_/g, ' ');
            const currentTemp = data.current_condition[0].temp_C;
            const lowTemp = data.weather[0].mintempC;
            const highTemp = data.weather[0].maxtempC;
            const description = data.current_condition[0].weatherDesc[0].value;

            weatherTableHTML += `
                <tr>
                    <td>${cityName}</td>
                    <td>${currentTemp}°C</td>
                    <td>${lowTemp}°C</td>
                    <td>${highTemp}°C</td>
                    <td>${description}</td>
                </tr>
            `;
        });

        weatherTableHTML += `</tbody></table></div>`;
        contentArea.innerHTML = weatherTableHTML;

    } catch (error) {
        console.error("Lỗi khi tải dữ liệu thời tiết:", error);
        contentArea.innerHTML = `<p class="error-text">Không thể tải dữ liệu thời tiết. Vui lòng thử lại sau.</p>`;
    }
}


// --- CHỨC NĂNG CHO CÂU HỎI 6 (RSS FEED) ---

async function showRssFeed() {
    // Lấy vùng hiển thị chính (an toàn khi hàm được gọi từ nhiều chỗ)
    const contentArea = document.getElementById('part-c');
    if (!contentArea) return console.warn('showRssFeed: #part-c not found');
    contentArea.innerHTML = '<p class="loading-text">Đang tải tin tức từ VnExpress...</p>';

    const RSS_URL = 'https://vnexpress.net/rss/the-thao.rss';
    // Thử nhiều proxy công cộng khác nhau (theo thứ tự) để tránh trường hợp proxy bị chặn
    const proxyCandidates = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(RSS_URL)}`,
        // thingproxy trả raw content
        `https://thingproxy.freeboard.io/fetch/${encodeURIComponent(RSS_URL)}`,
        // allorigins/get trả JSON: {contents: "..."}
        `https://api.allorigins.win/get?url=${encodeURIComponent(RSS_URL)}`
    ];

    try {
        let xmlText = null;
        let usedProxy = null;

        for (const proxy of proxyCandidates) {
            try {
                console.debug('Trying RSS proxy:', proxy);
                const resp = await fetch(proxy);
                if (!resp.ok) {
                    console.warn('Proxy returned non-ok status', proxy, resp.status);
                    continue;
                }

                // allorigins.get returns JSON with `contents`
                if (proxy.includes('/get?url=')) {
                    const js = await resp.json();
                    if (js && js.contents) {
                        xmlText = js.contents;
                        usedProxy = proxy;
                        break;
                    } else {
                        console.warn('No contents in allorigins response', js);
                        continue;
                    }
                } else {
                    xmlText = await resp.text();
                    usedProxy = proxy;
                    break;
                }
            } catch (innerErr) {
                console.warn('Proxy attempt failed', proxy, innerErr);
                continue;
            }
        }

        if (!xmlText) throw new Error('All proxy attempts failed');
        console.debug('RSS fetched successfully via proxy:', usedProxy);
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        
        const items = xmlDoc.querySelectorAll('item');
        
        let rssHTML = `<div class="rss-feed-container" style="animation: fadeIn 0.5s ease;"><h3>Tin tức Thể thao - VnExpress</h3>`;

        items.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const descriptionHTML = item.querySelector('description').textContent;

            // Tách ảnh và mô tả từ chuỗi HTML của description
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = descriptionHTML;
            const imageUrl = tempDiv.querySelector('img')?.src || '';
            const descriptionText = tempDiv.querySelector('a').nextSibling?.textContent || '...';

            rssHTML += `
                <div class="rss-item-card">
                    <img src="${imageUrl}" alt="" class="rss-item-image">
                    <div class="rss-item-content">
                        <h4 class="rss-item-title"><a href="${link}" target="_blank">${title}</a></h4>
                        <p class="rss-item-description">${descriptionText}</p>
                        <a href="${link}" target="_blank" class="rss-item-link">Đọc thêm &rarr;</a>
                    </div>
                </div>
            `;
        });

        rssHTML += `</div>`;
    // Nếu muốn, hiển thị thông tin proxy đã dùng (debug only)
    // rssHTML += `<p class="loading-text">(Đã lấy tin qua proxy: ${usedProxy || 'direct'})</p>`;
    contentArea.innerHTML = rssHTML;

    } catch (error) {
        console.error("Lỗi khi tải RSS feed:", error);
        const message = error && error.message ? error.message : 'Lỗi không xác định';
        contentArea.innerHTML = `<p class="error-text">Không thể tải tin tức. Lỗi: ${message}. Nếu lỗi liên quan đến proxy, hãy kiểm tra kết nối mạng hoặc thử lại sau.</p>`;
    }
}

// bottom bindings removed; handlers are attached inside DOMContentLoaded
// =======================================================
// === BẮT ĐẦU PHẦN CODE CHO CÂU 7 (LOGIN TRÊN TRANG CHÍNH) ===
// =======================================================

// Hàm 1: Cập nhật trạng thái của nút (Login hoặc Logout) dựa trên localStorage
function updateLoginStatus() {
    const btn = document.getElementById('login-logout-btn');
    if (!btn) return; // nếu không tìm thấy nút thì không làm gì
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        btn.textContent = `Logout (${loggedInUser})`;
    } else {
        btn.textContent = 'Login';
    }
}

// Hàm 2: Hiển thị form đăng nhập trong khu vực #part-c
function showLoginForm() {
    const loginFormHTML = `
        <div class="login-card-main" style="animation: fadeIn 0.5s ease;">
            <h2>Đăng nhập</h2>
            <p>Vui lòng nhập thông tin để tiếp tục</p>
            <form id="login-form-main">
                <div class="input-group">
                    <label for="username">Tên đăng nhập</label>
                    <input type="text" id="username" placeholder="Nhập tên của bạn" required>
                </div>
                <div class="input-group">
                    <label for="password">Mật khẩu</label>
                    <input type="password" id="password" placeholder="Nhập mật khẩu" required>
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    `;
    const contentArea = document.getElementById('part-c');
    if (!contentArea) return console.warn('showLoginForm: #part-c not found');
    contentArea.innerHTML = loginFormHTML;

    // Sau khi form đã được hiển thị, gán sự kiện submit cho nó
    const loginForm = document.getElementById('login-form-main');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kiểm tra đăng nhập đơn giản
                if (username && password) {
                // Lưu tên người dùng vào localStorage
                localStorage.setItem('loggedInUser', username);
                
                alert('Đăng nhập thành công!');
                
                // Cập nhật lại nút menu thành "Logout"
                updateLoginStatus();
                    
                    // Quay trở lại trang "About me" mặc định bằng cách kích nút About
                    const aboutBtn = document.getElementById('about-me-btn');
                    if (aboutBtn) {
                        aboutBtn.click();
                    }
            } else {
                alert('Vui lòng nhập đầy đủ thông tin.');
            }
        });
    }
}

// Hàm 3: Gán sự kiện click chính cho nút Login/Logout
const _loginBtn = document.getElementById('login-logout-btn');
if (_loginBtn) {
    _loginBtn.addEventListener('click', function(event) {
        event.preventDefault();
        const loggedInUser = localStorage.getItem('loggedInUser');

        if (loggedInUser) {
            // Nếu ĐANG ĐĂNG NHẬP -> Thực hiện LOGOUT
            if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                localStorage.removeItem('loggedInUser');
                updateLoginStatus();
                alert('Bạn đã đăng xuất thành công.');
                // Quay về trang mặc định bằng cách kích nút About
                const aboutBtn = document.getElementById('about-me-btn');
                if (aboutBtn) aboutBtn.click();
            }
        } else {
            // Nếu CHƯA ĐĂNG NHẬP -> Hiển thị form LOGIN
            showLoginForm();
        }
    });
}

// YÊU CẦU QUAN TRỌNG: Gọi hàm này một lần khi trang vừa tải xong
// để kiểm tra và cập nhật trạng thái nút cho đúng
updateLoginStatus();

// =====================================================
// === KẾT THÚC PHẦN CODE CHO CÂU 7 (LOGIN TRÊN TRANG CHÍNH) ===
// =====================================================

// =======================================================
// === BẮT ĐẦU PHẦN CODE CHO CÂU 8 (VIETLOTT API) ===
// =======================================================

// Hàm 1: Hiển thị giao diện ban đầu (radio buttons)
function showVietlott() {
    const vietlottContainer = document.getElementById('vietlott-container');
    if (!vietlottContainer) return;

    // Tạo HTML cho các radio buttons và khu vực hiển thị kết quả
    const vietlottHTML = `
        <div class="vietlott-controls">
            <label>
                <input type="radio" name="vietlott_type" value="mega645" checked>
                <span>Mega 6/45</span>
            </label>
            <label>
                <input type="radio" name="vietlott_type" value="power655">
                <span>Power 6/55</span>
            </label>
        </div>
        <div id="vietlott-result-table">
            <!-- Bảng kết quả sẽ được chèn vào đây -->
        </div>
    `;
    vietlottContainer.innerHTML = vietlottHTML;

    // Gán sự kiện cho các radio buttons
    const radioButtons = document.querySelectorAll('input[name="vietlott_type"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            fetchAndDisplayVietlott(this.value);
        });
    });

    // Tự động tải dữ liệu cho lựa chọn mặc định (Mega 6/45)
    fetchAndDisplayVietlott('mega645');
}

// Hàm 2: Dùng AJAX (fetch) để lấy và hiển thị dữ liệu
async function fetchAndDisplayVietlott(type) {
    const resultTable = document.getElementById('vietlott-result-table');
    if (!resultTable) return;
    
    resultTable.innerHTML = `<p class="loading-text">Đang tải dữ liệu...</p>`;

    const API_URL = 'https://webapi.dantri.com.vn/lottery/get-vietlott-jack';
    
    // Danh sách các proxy để thử
    const proxyList = [
        // AllOrigins raw
        `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`,
        // AllOrigins get (returns {contents: "..."})
        `https://api.allorigins.win/get?url=${encodeURIComponent(API_URL)}`,
        // Thingproxy
        `https://thingproxy.freeboard.io/fetch/${API_URL}`,
        // Corsanywhere (yêu cầu temporary access)
        `https://cors-anywhere.herokuapp.com/${API_URL}`,
        // CORS.SH
        `https://cors.sh/${API_URL}`
    ];

    let success = false;
    let data = null;

    // Thử lần lượt các proxy cho đến khi thành công
    for (const proxyUrl of proxyList) {
        try {
            console.log('Đang thử proxy:', proxyUrl);
            const response = await fetch(proxyUrl, {
                headers: {
                    'origin': window.location.origin
                }
            });

            if (!response.ok) {
                console.warn('Proxy trả về lỗi:', response.status);
                continue;
            }

            // Xử lý response tùy theo loại proxy
            if (proxyUrl.includes('allorigins.win/get')) {
                const jsonResponse = await response.json();
                if (jsonResponse && jsonResponse.contents) {
                    data = JSON.parse(jsonResponse.contents);
                }
            } else {
                data = await response.json();
            }

            if (data && data[type]) {
                success = true;
                break;
            }

        } catch (error) {
            console.warn('Lỗi khi dùng proxy:', proxyUrl, error);
            continue;
        }
    }

    if (!success || !data || !data[type]) {
        resultTable.innerHTML = `
            <p class="error-text">
                Không thể tải dữ liệu Vietlott. 
                <br>Đã thử ${proxyList.length} proxy nhưng không thành công.
                <br>Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.
            </p>`;
        return;
    }

    // Lấy và hiển thị dữ liệu
    const lotteryData = data[type];
    const formattedAmount = parseInt(lotteryData.amount).toLocaleString('vi-VN');

    // Tạo bảng kết quả với animation
    const tableHTML = `
        <table class="vietlott-table" style="animation: fadeIn 0.3s ease;">
            <tbody>
                <tr><th>Kỳ quay</th><td>#${lotteryData.day}</td></tr>
                <tr><th>Ngày</th><td>${lotteryData.date}</td></tr>
                <tr><th>Dãy số</th><td class="jackpot-numbers">${lotteryData.number.join(' - ')}</td></tr>
                <tr><th>Giá trị Jackpot</th><td class="jackpot-amount">${formattedAmount} VNĐ</td></tr>
            </tbody>
        </table>
    `;
    resultTable.innerHTML = tableHTML;
}

// Gọi hàm để hiển thị giao diện Vietlott ngay khi trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    showVietlott();

    // =======================================================
// === BẮT ĐẦU PHẦN CODE CHO CÂU 10 (FOOTER CLOCK) ===
// =======================================================

// Hàm 1: Cập nhật nội dung cho footer
function updateFooterClock() {
    const footerInfo = document.getElementById('footer-info');
    if (!footerInfo) return; // Nếu không tìm thấy phần tử, dừng lại

    // Thay "Nguyễn Thị Bảo Ny" bằng tên đầy đủ của bạn
    const studentName = "Nguyễn Thị Bảo Ny"; 
    
    // Lấy ngày giờ hiện tại của máy tính
    const now = new Date();

    // Định dạng lại ngày giờ cho đẹp (VD: 01/10/2025 08:30:05)
    const date = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const formattedDateTime = `${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;

    // Tạo câu hoàn chỉnh và hiển thị
    footerInfo.textContent = `Designed by ${studentName}, today is ${formattedDateTime}`;
}

// YÊU CẦU QUAN TRỌNG: Cập nhật đồng hồ mỗi giây
// Gọi hàm 1 lần để hiển thị ngay lập tức
updateFooterClock(); 
// Sau đó, cứ mỗi 1000ms (1 giây) thì gọi lại hàm updateFooterClock
setInterval(updateFooterClock, 1000);

// =====================================================
// === KẾT THÚC PHẦN CODE CHO CÂU 10 (FOOTER CLOCK) ===
// =====================================================F
});
