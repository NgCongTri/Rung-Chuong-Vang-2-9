/**
 * DỮ LIỆU 20 CÂU HỎI TUYỂN CHỌN HỘI THI RUNG CHUÔNG VÀNG
 * - 4 câu hỏi nhận diện bài hát cách mạng hào hùng.
 * - 16 câu hỏi lịch sử Việt Nam tinh tuyển.
 */

const quizData = [
    {
        id: 1,
        type: "audio",
        audioSrc: "tien-ve-sai-gon.mp3",
        question: "Bạn hãy lắng nghe giai điệu hào hùng sau và cho biết đây là bài hát nào?",
        options: [
            "A. Tiến về Hà Nội",
            "B. Tiến về Sài Gòn",
            "C. Giải phóng miền Nam",
            "D. Đất nước trọn niềm vui"
        ],
        correctIndex: 1,
        explanation: "Bài hát 'Tiến về Sài Gòn' do nhạc sĩ Lưu Hữu Phước sáng tác năm 1966, cổ vũ tinh thần giải phóng miền Nam thống nhất đất nước."
    },
    {
        id: 2,
        type: "audio",
        audioSrc: "giai-phong-mien-nam.mp3",
        question: "Giai điệu rực lửa chiến đấu bạn vừa nghe là của ca khúc nổi tiếng nào?",
        options: [
            "A. Giải phóng Miền Nam",
            "B. Nối vòng tay lớn",
            "C. Bài ca thống nhất",
            "D. Tiến bước dưới quân kỳ"
        ],
        correctIndex: 0,
        explanation: "Bài hát 'Giải phóng Miền Nam' được sáng tác năm 1961, là bài ca chính thức của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam."
    },
    {
        id: 3,
        type: "audio",
        audioSrc: "Đất Nước Trọn Niềm Vui.mp3",
        question: "Giai điệu hân hoan rộn rã: 'Ta đi trong muôn ánh sao vàng, rừng cờ tung bay...' thuộc ca khúc nào?",
        options: [
            "A. Mùa xuân trên Thành phố Hồ Chí Minh",
            "B. Hà Nội niềm tin và hy vọng",
            "C. Đất nước trọn niềm vui",
            "D. Cung đàn mùa xuân"
        ],
        correctIndex: 2,
        explanation: "'Đất nước trọn niềm vui' do nhạc sĩ Hoàng Hà sáng tác vào đêm 26/4/1975 tại Hà Nội, đón đầu ngày đại thắng 30/4/1975."
    },
    {
        id: 4,
        type: "audio",
        audioSrc: "Như Có Bác Hồ Trong Ngày Vui Đại Thắng.mp3",
        question: "Giai điệu quen thuộc, hào sảng đi cùng năm tháng này có tên là gì?",
        options: [
            "A. Như có Bác Hồ trong ngày vui đại thắng",
            "B. Bác đang cùng chúng cháu hành quân",
            "C. Đêm qua em mơ gặp Bác Hồ",
            "D. Tiến quân ca"
        ],
        correctIndex: 0,
        explanation: "Nhạc sĩ Phạm Tuyên đã sáng tác bài hát 'Như có Bác Hồ trong ngày vui đại thắng' chỉ trong 2 tiếng đêm 28/4/1975."
    },
    {
        id: 5,
        type: "text",
        question: "Bản Tuyên ngôn Độc lập được Chủ tịch Hồ Chí Minh đọc tại đâu vào ngày 02/09/1945?",
        options: [
            "A. Quảng trường Đông Kinh Nghĩa Thục",
            "B. Quảng trường Ba Đình",
            "C. Quảng trường Cách mạng tháng Tám",
            "D. Bến Nhà Rồng"
        ],
        correctIndex: 1,
        explanation: "Vào ngày 02/09/1945, tại Quảng trường Ba Đình (Hà Nội), Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa."
    },
    {
        id: 6,
        type: "text",
        question: "Khởi nghĩa giành chính quyền ở Cố đô Huế diễn ra vào ngày tháng năm nào?",
        options: [
            "A. 19/08/1945",
            "B. 23/08/1945",
            "C. 25/08/1945",
            "D. 02/09/1945"
        ],
        correctIndex: 1,
        explanation: "Ngày 23/08/1945, nhân dân Thừa Thiên - Huế dưới sự lãnh đạo của Mặt trận Việt Minh đã vùng lên khởi nghĩa giành chính quyền thắng lợi."
    },
    {
        id: 7,
        type: "text",
        question: "Nhân dân Sài Gòn nổi dậy khởi nghĩa giành chính quyền vào ngày tháng năm nào?",
        options: [
            "A. 19/08/1945",
            "B. 23/08/1945",
            "C. 25/08/1945",
            "D. 30/08/1945"
        ],
        correctIndex: 2,
        explanation: "Ngày 25/08/1945, hàng triệu đồng bào Sài Gòn - Chợ Lớn và các tỉnh lân cận rầm rộ biểu tình, giành chính quyền về tay nhân dân."
    },
    {
        id: 8,
        type: "text",
        question: "Vị vua cuối cùng của triều đại phong kiến Việt Nam đã tuyên bố thoái vị trong Cách mạng tháng Tám là ai?",
        options: [
            "A. Vua Hàm Nghi",
            "B. Vua Khải Định",
            "C. Vua Thành Thái",
            "D. Vua Bảo Đại"
        ],
        correctIndex: 3,
        explanation: "Ngày 30/08/1945, Vua Bảo Đại (Nguyễn Phúc Vĩnh Thụy) đọc chiếu thoái vị tại Ngọ Môn - Huế, trao ấn kiếm cho đại diện Chính phủ lâm thời."
    },
    {
        id: 9,
        type: "text",
        question: "Bài hát nào đã được chọn làm Quốc ca của nước Việt Nam Dân chủ Cộng hòa ngay từ những ngày đầu độc lập?",
        options: [
            "A. Chào cờ",
            "B. Tiến quân ca",
            "C. Mười chín tháng Tám",
            "D. Làng tôi"
        ],
        correctIndex: 1,
        explanation: "Tại Quốc dân Đại hội Tân Trào (16-17/08/1945) và Kỳ họp thứ nhất Quốc hội khóa I (1946), bài 'Tiến quân ca' đã được chính thức chọn làm Quốc ca Việt Nam."
    },
    {
        id: 10,
        type: "text",
        question: "Tác giả của bài hát 'Tiến quân ca' (Quốc ca Việt Nam) là nhạc sĩ nào?",
        options: [
            "A. Nhạc sĩ Phạm Tuyên",
            "B. Nhạc sĩ Lưu Hữu Phước",
            "C. Nhạc sĩ Văn Cao",
            "D. Nhạc sĩ Phong Nhã"
        ],
        correctIndex: 2,
        explanation: "Nhạc sĩ Văn Cao sáng tác 'Tiến quân ca' vào cuối năm 1944 tại căn gác số 171 phố Mai Hắc Đế, Hà Nội."
    },
    {
        id: 11,
        type: "text",
        question: "'Hỡi đồng bào toàn quốc! Tất cả mọi người đều sinh ra có quyền bình đẳng...' là câu mở đầu của văn kiện lịch sử nào?",
        options: [
            "A. Lời kêu gọi toàn quốc kháng chiến",
            "B. Tuyên ngôn Độc lập",
            "C. Lời kêu gọi chống Mỹ cứu nước",
            "D. Hiến pháp năm 1946"
        ],
        correctIndex: 1,
        explanation: "Đây là những lời mở đầu đanh thép trong Tuyên ngôn Độc lập ngày 02/09/1945 của Chủ tịch Hồ Chí Minh."
    },
    {
        id: 12,
        type: "text",
        question: "Câu nói nổi tiếng: 'Trẫm muốn làm dân một nước tự do, hơn làm vua một nước nô lệ' là của ai?",
        options: [
            "A. Vua Duy Tân",
            "B. Vua Bảo Đại",
            "C. Vua Hàm Nghi",
            "D. Vua Tự Đức"
        ],
        correctIndex: 1,
        explanation: "Đây là lời tuyên bố nổi tiếng của Vua Bảo Đại trong bản Tuyên ngôn thoái vị ngày 30/08/1945 tại Huế."
    },
    {
        id: 13,
        type: "text",
        question: "Lá cờ đỏ sao vàng xuất hiện lần đầu tiên trong cuộc khởi nghĩa nào trước Cách mạng tháng Tám?",
        options: [
            "A. Phong trào Xô viết Nghệ Tĩnh (1930)",
            "B. Khởi nghĩa Bắc Sơn (1940)",
            "C. Khởi nghĩa Nam Kỳ (1940)",
            "D. Binh biến Đô Lương (1941)"
        ],
        correctIndex: 2,
        explanation: "Lá cờ đỏ sao vàng năm cánh lần đầu tiên tung bay kiêu hãnh trong cuộc Khởi nghĩa Nam Kỳ bùng nổ vào tháng 11/1940."
    },
    {
        id: 14,
        type: "text",
        question: "Phong trào đấu tranh nào diễn ra sôi nổi nhất ở Bắc Kỳ và Bắc Trung Kỳ đầu năm 1945, thu hút hàng triệu quần chúng tham gia?",
        options: [
            "A. Chống thu thuế",
            "B. Phá kho thóc của Nhật, giải quyết nạn đói",
            "C. Bãi công của công nhân",
            "D. Biểu tình chống bắt lính"
        ],
        correctIndex: 1,
        explanation: "Phong trào 'Phá kho thóc Nhật, cứu đói' đã đáp ứng nguyện vọng cấp bách nhất của nhân dân tiến tới Tổng khởi nghĩa."
    },
    {
        id: 15,
        type: "text",
        question: "Lúc đang đọc Tuyên ngôn Độc lập ngày 02/09/1945, Bác Hồ đã dừng lại và hỏi đồng bào thân tình câu gì?",
        options: [
            "A. 'Đồng bào có đói không?'",
            "B. 'Đồng bào nghe có hiểu không?'",
            "C. 'Tôi nói đồng bào nghe rõ không?'",
            "D. 'Đồng bào có đồng ý không?'"
        ],
        correctIndex: 2,
        explanation: "Giữa biển người tại Quảng trường Ba Đình, Bác dừng lại hỏi 'Tôi nói đồng bào nghe rõ không?', cả biển người đồng thanh đáp vang dội 'Rõ!'."
    },
    {
        id: 16,
        type: "text",
        question: "Hội nghị Diên Hồng lịch sử - biểu tượng của khối đại đoàn kết toàn dân tộc chống giặc Nguyên Mông - được tổ chức dưới thời vua nào?",
        options: [
            "A. Trần Thái Tông",
            "B. Trần Thánh Tông",
            "C. Trần Nhân Tông",
            "D. Trần Anh Tông"
        ],
        correctIndex: 2,
        explanation: "Hội nghị Diên Hồng do Thượng hoàng Trần Thánh Tông và Vua Trần Nhân Tông triệu tập các bô lão cả nước vào năm Giáp Thân (1284) tại điện Diên Hồng."
    },
    {
        id: 17,
        type: "text",
        question: "Câu: 'Việc nhân nghĩa cốt ở yên dân' là tư tưởng cốt lõi mở đầu cho kiệt tác văn học nào?",
        options: [
            "A. Nam quốc sơn hà",
            "B. Bình Ngô đại cáo",
            "C. Hịch tướng sĩ",
            "D. Chiếu dời đô"
        ],
        correctIndex: 1,
        explanation: "Hai câu mở đầu 'Bình Ngô đại cáo': 'Từng nghe: Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo'."
    },
    {
        id: 18,
        type: "text",
        question: "Lời hiệu triệu đanh thép: 'Đánh cho để dài tóc, đánh cho để đen răng / Đánh cho nó chích luân bất phản...' gắn liền với vị anh hùng dân tộc nào?",
        options: [
            "A. Gia Long",
            "B. Quang Trung (Nguyễn Huệ)",
            "C. Minh Mạng",
            "D. Tự Đức"
        ],
        correctIndex: 1,
        explanation: "Đây là bài hiểu dụ tướng sĩ bất hủ của Hoàng đế Quang Trung tại Nghệ An trên đường tiến quân ra Bắc đại phá 29 vạn quân Thanh mùa xuân Kỷ Dậu 1789."
    },
    {
        id: 19,
        type: "text",
        question: "'Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh mà hưng thịnh...' Câu nói bất hủ khắc trên bia tiến sĩ Văn Miếu là của ai?",
        options: [
            "A. Nguyễn Trãi",
            "B. Lê Quý Đôn",
            "C. Thân Nhân Trung",
            "D. Ngô Sĩ Liên"
        ],
        correctIndex: 2,
        explanation: "Tiến sĩ Thân Nhân Trung đã soạn câu nói bất hủ này trong bài văn bia khoa thi Nhâm Tuất (1442) dựng tại Văn Miếu - Quốc Tử Giám Hà Nội."
    },
    {
        id: 20,
        type: "text",
        question: "'Dân ta phải biết sử ta / Cho tường gốc tích nước nhà Việt Nam.' Hai câu thơ giản dị mà sâu sắc trên là của ai?",
        options: [
            "A. Phan Bội Châu",
            "B. Hồ Chí Minh",
            "C. Huỳnh Thúc Kháng",
            "D. Võ Nguyên Giáp"
        ],
        correctIndex: 1,
        explanation: "Chủ tịch Hồ Chí Minh đã viết tác phẩm 'Lịch sử nước ta' bằng thơ năm 1942, mở đầu bằng hai câu thơ dạy về lòng yêu nước và ý thức tìm hiểu cội nguồn dân tộc."
    }
];