const input = document.getElementById('fileInput');
const statusEl = document.getElementById('status');
const logoEl = document.getElementById('logo');

// Image popup with multiple variants
let currentImageIndex = 0;
let currentImageSet = [];

// Product detailed information
const productDetails = {
    'LEVEL LV710': {
        name: 'LV710',
        category: 'Tay nắm hợp kim kẽm',
        code: 'GB, CCR',
        launchDate: 'M003 Plus',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 viên pin kiềm LR6 1.5 V' },
            { spec: 'Dòng tĩnh', detail: '< 30 μA' },
            { spec: 'Dòng động', detail: '< 150 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '-20 ~ +80 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 90% RH' },
            { spec: 'Nhiệt độ', detail: '-10 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 90% RH' },
            { spec: 'Tần số hoạt động', detail: '113.56 MHz' },
            { spec: 'Khoảng cách đọc thẻ', detail: '0–35 mm' },
            { spec: 'Thời gian mở khóa', detail: 'Sau khi đọc thẻ, vặn tay nắm để mở cửa; nếu không vặn trong vòng 3 giây, cửa sẽ tự động khóa lại.' },
            { spec: 'Cảnh báo điện áp thấp', detail: 'Khi điện áp làm việc < 4.8 V, đèn báo chuyển đỏ và còi kêu khi mở khóa. Ổ khóa vẫn có thể mở khoảng 100 lần trước khi phải thay pin.' },
            { spec: 'Trọng lượng', detail: '2.5–3 kg.' },
        ]
    },

    'MF1 RF-1660': {
        name: 'MF1 RF-1660',
        category: 'Tay nắm hợp kim kẽm',
        code: 'CR, SPVD',
        launchDate: 'M001, M003',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 viên pin kiềm LR6 1.5 V' },
            { spec: 'Dòng tĩnh', detail: '< 20 μA' },
            { spec: 'Dòng động', detail: '< 150 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '-20 ~ +80 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 90% RH' },
            { spec: 'Nhiệt độ', detail: '-10 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 90% RH' },
            { spec: 'Tần số hoạt động', detail: '13.56 MHz' },
            { spec: 'Khoảng cách đọc thẻ', detail: '0–35 mm' },
            { spec: 'Thời gian mở khóa', detail: 'Sau khi đọc thẻ, vặn tay nắm để mở cửa; nếu không vặn trong vòng 3 giây, cửa sẽ tự động khóa lại.' },
            { spec: 'Cảnh báo điện áp thấp', detail: 'Khi điện áp làm việc < 4.8 V, đèn báo chuyển đỏ và còi kêu khi mở khóa. Ổ khóa vẫn có thể mở khoảng 100 lần trước khi phải thay pin.' },
            { spec: 'Trọng lượng', detail: '2.5–3 kg.' },
        ]
    },

    'RF-1620': {
        name: 'RF-1620',
        category: 'Tay nắm hợp kim kẽm',
        code: 'CR, SPVD',
        launchDate: 'M001, M003',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 viên pin kiềm LR6 1.5 V' },
            { spec: 'Dòng tĩnh', detail: '< 20 μA' },
            { spec: 'Dòng động', detail: '< 150 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '-20 ~ +80 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 90% RH' },
            { spec: 'Nhiệt độ', detail: '-10 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 90% RH' },
            { spec: 'Tần số hoạt động', detail: '13.56 MHz' },
            { spec: 'Khoảng cách đọc thẻ', detail: '0–35 mm' },
            { spec: 'Thời gian mở khóa', detail: 'Sau khi đọc thẻ, vặn tay nắm để mở cửa; nếu không vặn trong vòng 3 giây, cửa sẽ tự động khóa lại.' },
            { spec: 'Cảnh báo điện áp thấp', detail: 'Khi điện áp làm việc < 4.8 V, đèn báo chuyển đỏ và còi kêu khi mở khóa. Ổ khóa vẫn có thể mở khoảng 100 lần trước khi phải thay pin.' },
            { spec: 'Trọng lượng', detail: '2.5–3 kg.' },
        ]
    },

    'RF-1320': {
        name: 'RF-1320',
        category: 'Hợp kim nhôm',
        code: 'PVR, PPVD, PGB',
        launchDate: 'M001, M003',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 viên pin kiềm LR6 1.5 V' },
            { spec: 'Dòng tĩnh', detail: '< 20 μA' },
            { spec: 'Dòng động', detail: '< 150 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '-20 ~ +80 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 90% RH' },
            { spec: 'Nhiệt độ', detail: '-10 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 90% RH' },
            { spec: 'Tần số hoạt động', detail: '13.56 MHz' },
            { spec: 'Khoảng cách đọc thẻ', detail: '0–35 mm' },
            { spec: 'Thời gian mở khóa', detail: 'Sau khi đọc thẻ, vặn tay nắm để mở cửa; nếu không vặn trong vòng 3 giây, cửa sẽ tự động khóa lại.' },
            { spec: 'Cảnh báo điện áp thấp', detail: 'Khi điện áp làm việc < 4.8 V, đèn báo chuyển đỏ và còi kêu khi mở khóa. Ổ khóa vẫn có thể mở khoảng 100 lần trước khi phải thay pin.' },
            { spec: 'Trọng lượng', detail: '2.5–3 kg.' },
        ]
    },

    'MDT-330': {
        name: 'MDT-330',
        category: 'Thép không gỉ SUS304',
        code: 'SS, SPVD, GB, AC',
        launchDate: 'Nhiều loại thân khóa cơ chuẩn EU',
        char: 'PVC và nhôm',
        require: 'Vân tay / Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Thời gian lấy mẫu vân tay', detail: '< 0.5 giây' },
            { spec: 'Thời gian so khớp vân tay', detail: '< 1 giây' },
            { spec: 'FRR (tỷ lệ từ chối sai)', detail: '≤ 1%' },
            { spec: 'FAR (tỷ lệ chấp nhận sai)', detail: '≤ 0.0001%' },
            { spec: 'Dung lượng lưu trữ:', detail: '200 vân tay (có thể mở rộng)' },
            { spec: 'Điện áp', detail: '4.8–6.0 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '≤ 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ hoạt động', detail: '−8 ~ 60 °C' },
            { spec: 'Độ phân giải', detail: '500 dpi' },
            { spec: 'Đăng ký vân tay', detail: 'quét 2 lần để tạo mẫu' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'MD-290': {
        name: 'MD-290',
        category: 'Thép không gỉ SUS304',
        code: 'SS, SPVD, GB, AC',
        launchDate: 'nhiều loại thân khóa cơ chuẩn EU',
        char: 'PVC và nhôm',
        require: 'Vân tay / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Thời gian lấy mẫu vân tay', detail: '< 0.5 giây>' },
            { spec: 'Thời gian so khớp vân tay', detail: '< 1 giây' },
            { spec: 'FRR (tỷ lệ từ chối sai)', detail: '≤ 1%' },
            { spec: 'FAR (tỷ lệ chấp nhận sai)', detail: '≤ 0.0001%' },
            { spec: 'Dung lượng lưu trữ:', detail: '200 vân tay (có thể mở rộng)' },
            { spec: 'Điện áp', detail: '4.8–6.0 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '≤ 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ hoạt động', detail: '−8 ~ 60 °C' },
            { spec: 'Độ phân giải', detail: '500 dpi' },
            { spec: 'Đăng ký vân tay', detail: 'quét 2 lần để tạo mẫu' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'MDT-1320': {
        name: 'MDT-1320',
        category: 'Kính acrylic (Plexiglass) + Hợp kim nhôm',
        code: 'VR, SB, MG',
        launchDate: 'SS M6068',
        char: '',
        require: 'Vân tay / Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Thời gian lấy mẫu vân tay', detail: '< 0.5 giây' },
            { spec: 'Thời gian so khớp vân tay', detail: '< 1 giây' },
            { spec: 'FRR (tỷ lệ từ chối sai)', detail: '≤ 1%' },
            { spec: 'FAR (tỷ lệ chấp nhận sai)', detail: '≤ 0.0001%' },
            { spec: 'Dung lượng lưu trữ:', detail: '100 vân tay, 99 thẻ, 2 mật khẩu (có thể mở rộng)' },
            { spec: 'Điện áp', detail: '4.8–6.0 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '≤ 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ hoạt động', detail: '−8 ~ 60 °C' },
            { spec: 'Độ phân giải', detail: '500 dpi' },
            { spec: 'Đăng ký vân tay', detail: 'quét 2 lần để tạo mẫu' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'TDT-1550': {
        name: 'TDT-1550',
        category: 'Kính acrylic (Plexiglass) + Hợp kim kẽm',
        code: 'CR, SPVD',
        launchDate: 'SS M001, SS M003',
        char: '',
        require: 'Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '< 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '−20 ~ +85 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 98% RH' },
            { spec: 'Nhiệt độ', detail: '−15 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 85% RH' },
            { spec: 'Tần số hoạt động', detail: '13.56 MHz (MF1)' },
            { spec: 'Dung lượng thẻ', detail: '200 thẻ' },
            { spec: 'Mật khẩu', detail: '2 nhóm (có thể mở rộng)' },
            { spec: 'Thời gian phản hồi', detail: '≤ 100 ms' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'MDT-M12': {
        name: 'MDT-M12',
        category: 'Thép không gỉ SUS304',
        code: 'SS, SPVD, GB',
        launchDate: 'SS M6068',
        char: '',
        require: 'Vân tay / Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Thời gian lấy mẫu vân tay', detail: '< 0.5 giây' },
            { spec: 'Thời gian so khớp vân tay', detail: '< 1 giây' },
            { spec: 'FRR (tỷ lệ từ chối sai)', detail: '≤ 1%' },
            { spec: 'FAR (tỷ lệ chấp nhận sai)', detail: '≤ 0.0001%' },
            { spec: 'Dung lượng lưu trữ:', detail: '100 vân tay, 99 thẻ, 2 mật khẩu (có thể mở rộng)' },
            { spec: 'Điện áp', detail: '4.8–6.0 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '≤ 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ hoạt động', detail: '−8 ~ 60 °C' },
            { spec: 'Độ phân giải', detail: '500 dpi' },
            { spec: 'Đăng ký vân tay', detail: 'quét 2 lần để tạo mẫu' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'TDT-1330': {
        name: 'TDT-1330',
        category: 'Kính acrylic (Plexiglass) + Hợp kim kẽm',
        code: 'CR, RG',
        launchDate: 'SS M001, SS M003',
        char: '',
        require: 'Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '< 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '−20 ~ +85 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 98% RH' },
            { spec: 'Nhiệt độ', detail: '−15 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 85% RH' },
            { spec: 'Tần số hoạt động', detail: '13.56 MHz (MF1)' },
            { spec: 'Dung lượng thẻ', detail: '200 thẻ' },
            { spec: 'Mật khẩu', detail: '2 nhóm (có thể mở rộng)' },
            { spec: 'Thời gian phản hồi', detail: '≤ 100 ms' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'TDT-1380': {
        name: 'TDT-1380',
        category: 'Kính acrylic (Plexiglass) + Hợp kim kẽm',
        code: 'CR, RG',
        launchDate: 'SS M001, SS M003',
        char: '',
        require: 'Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Nguồn cấp', detail: 'DC 4.5–6.5 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '< 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ lưu trữ', detail: '−20 ~ +85 °C' },
            { spec: 'Độ ẩm lưu trữ', detail: '10 ~ 98% RH' },
            { spec: 'Nhiệt độ', detail: '−15 ~ +60 °C' },
            { spec: 'Độ ẩm', detail: '15 ~ 85% RH' },
            { spec: 'Tần số hoạt động', detail: '13.56 MHz (MF1)' },
            { spec: 'Dung lượng thẻ', detail: '200 thẻ' },
            { spec: 'Mật khẩu', detail: '2 nhóm (có thể mở rộng)' },
            { spec: 'Thời gian phản hồi', detail: '≤ 100 ms' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'MDT-1380': {
        name: 'MDT-1380',
        category: 'Kính acrylic (Plexiglass) + Hợp kim kẽm',
        code: 'CFG, CR',
        launchDate: 'SS M6068',
        char: '',
        require: 'Vân tay / Bàn phím cảm ứng / Thẻ RFID / Chìa khóa cơ',
        specs: [
            { spec: 'Thời gian lấy mẫu vân tay', detail: '< 0.5 giây' },
            { spec: 'Thời gian so khớp vân tay', detail: '< 1 giây' },
            { spec: 'FRR (tỷ lệ từ chối sai)', detail: '≤ 1%' },
            { spec: 'FAR (tỷ lệ chấp nhận sai)', detail: '≤ 0.0001%' },
            { spec: 'Dung lượng lưu trữ:', detail: '200 vân tay (có thể mở rộng)' },
            { spec: 'Điện áp', detail: '4.8–6.0 V, dùng 4 pin kiềm AA 1.5 V' },
            { spec: 'Dòng tiêu thụ tĩnh', detail: '≤ 20 μA' },
            { spec: 'Dòng tiêu thụ động', detail: '< 200 mA' },
            { spec: 'Nhiệt độ hoạt động', detail: '−8 ~ 60 °C' },
            { spec: 'Độ phân giải', detail: '500 dpi' },
            { spec: 'Đăng ký vân tay', detail: 'quét 2 lần để tạo mẫu' },
            { spec: 'Tuổi thọ pin', detail: 'khoảng 1 năm' },
            { spec: 'Áp dụng cho', detail: 'cửa gỗ hoặc kim loại, độ dày 40–65 mm' },
            { spec: 'Cảnh báo pin yếu', detail: 'Sau khi báo pin yếu lần đầu, vẫn có thể mở khoảng 50 lần trước khi cần thay pin.' },
        ]
    },

    'DELLCOOL DW30CE': {
        type: 'minibar',
        name: 'DELLCOOL DW30CE',
        category: 'Minibar công nghệ hấp thụ Absorption',
        features: [
            'Vận hành siêu êm.',
            'Rã đông tự động.',
            'Công tắc đèn hồng ngoại (trừ mẫu 15L & 25L).',
            'Khay cửa (balcony) điều chỉnh được.',
            'Kệ trong tủ điều chỉnh được.'
        ],
        specials: [
            'Tiết kiệm năng lượng 20%+ với công nghệ “Brisk Walk” (dao động nhiệt nhỏ giúp tiết kiệm điện).',
            'Thích ứng với nhiệt độ môi trường 32°C.'
        ],
        compareTable: {
            headers: ['Model', 'Dung tích (L)', 'Công suất (W)', 'Nhiệt độ (°C)', 'Điện năng tiêu thụ (kWh/24h)', 'Kích thước máy (R x S x C, mm)', 'Kích thước đóng gói (R x S x C, mm', 'Khối lượng tịnh/tổng (kg)', 'Số lượng xếp container (20/40/40HQ)'],
            rows: [
                ['DW15CE', '13', '65', '0-10°C', '0.78', '350 x 310 x 456', '350 x 310 x 456', '11.5/13.1', '384/792/990'],
                ['DW25CE', '22', '65', '0-10°C', '0.8', '350 x 390 x 465', '350 x 440 x 490', '13.5/14.3', '312/648/810'],
                ['DW30CE', '29', '65', '0-10°C', '0.63', '402 x 425 x 500', '450 x 475 x 545', '15.6/17.1', '252/500/620'],
                ['DW40CE', '36', '65', '0-10°C', '0.64', '402 x 450 x 560', '450 x 490 x 600', '17.7/19.3', '225/463/496'],
                ['DW50CE', '45', '90', '0-10°C', '0.9', '402 x 450 x 670', '450 x 490 x 710', '20.2/22.5', '171/360/438'],
                ['DW60CE', '53', '90', '0-10°C', '0.9', '460 x 475 x 605', '510 x 530 x 635', '19.6/22.1', '132/288/384']
            ]
        }
    },

    'DELLCOOL DW30CTE': {
        type: 'minibar',
        name: 'DELLCOOL DW30CTE',
        category: 'Minibar công nghệ máy nén Compressor',
        features: [
            'Vận hành siêu êm.',
            'Rã đông tự động.',
            'Cửa kính 2 lớp',
            'Công tắc đèn hồng ngoại',
            'Kệ trong tủ điều chỉnh được.'
        ],
        specials: [
            'Tiết kiệm năng lượng 20%+ với công nghệ “Brisk Walk” (dao động nhiệt nhỏ giúp tiết kiệm điện).',
            'Thích ứng với nhiệt độ môi trường 32°C.'
        ],
        compareTable: {
            headers: ['Model', 'Dung tích (L)', 'Công suất (W)', 'Nhiệt độ (°C)', 'Điện năng tiêu thụ (kWh/24h)', 'Kích thước máy (R x S x C, mm)', 'Kích thước đóng gói (R x S x C, mm', 'Khối lượng tịnh/tổng (kg)', 'Số lượng xếp container (20/40/40HQ)'],
            rows: [
                ['DW30CTE', '29', '65', '4-12°C', '0.9', '402×425×500', '450×475×545', '18 / 20', '252 / 500 / 620'],
                ['DW40CTE', '36', '65', '4-12°C', '0.9', '402×450×560', '450×490×600', '21.1 / 22.5', '225 / 463 / 496'],
                ['DW50CTE', '45', '90', '4-12°C', '1.1', '402×450×670', '450×490×710', '22.6 / 24.9', '171 / 360 / 438'],
                ['DW60CTE', '53', '90', '4-12°C', '1.1', '460×475×605', '510×530×635', '26.1 / 28.6', '132 / 288 / 384']
            ]
        }
    },

    'DELLCOOL DW30RTE': {
        type: 'minibar',
        name: 'DELLCOOL DW30RTE',
        category: 'Minibar công nghệ điện tử Semiconductor',
        features: [
            'Vận hành siêu êm.',
            'Rã đông tự động.',
            'Cửa kính 3 lớp',
            'Công tắc đèn hồng ngoại (trừ mẫu 25L)',
            'Kệ trong tủ điều chỉnh được.',
            'Tùy chọn màu viền trang trí cửa kính (tùy chọn).'
        ],
        specials: [
            'Tiết kiệm năng lượng 30%+ với công nghệ “Brisk Walk” (các mẫu cửa kính 30L & 40L đạt tiêu chuẩn năng lượng Châu Âu).',
            'Thích ứng với nhiệt độ môi trường 32°C.',
            'Cảm biến “Electronic Dog” phát hiện/kiểm soát rò rỉ amoniac, trừ mẫu 25L (tùy chọn).'
        ],
        compareTable: {
            headers: ['Model', 'Dung tích (L)', 'Công suất (W)', 'Nhiệt độ (°C)', 'Điện năng tiêu thụ (kWh/24h)', 'Kích thước máy (R x S x C, mm)', 'Kích thước đóng gói (R x S x C, mm', 'Khối lượng tịnh/tổng (kg)', 'Số lượng xếp container (20/40/40HQ)'],
            rows: [
                ['DW25RTE', '22', '65', '4-12°C', '0.9', '350×390×465', '390×440×490', '16.7 / 17.5', '312 / 648 / 810'],
                ['DW30RTE', '29', '65', '4-12°C', '0.85', '402×425×500', '450×475×545', '18.9 / 20.9', '252 / 500 / 620'],
                ['DW40RTE', '36', '65', '4-12°C', '0.85', '402×450×560', '450×490×600', '22.1 / 23.5', '225 / 463 / 496'],
                ['DW50RTE', '45', '90', '4-12°C', '1.1', '402×450×670', '450×490×710', '23.6 / 25.9', '171 / 360 / 438'],
                ['DW60RTE', '53', '90', '4-12°C', '1.1', '460×475×605', '510×530×635', '26.1 / 28.6', '132 / 288 / 384']
            ]
        }
    },
};

// Product image variants - you can add more images here
const productImageVariants = {
    'LEVEL LV710': [
        { src: 'webimages/lv710/lv710.png', alt: 'LV710 Front View' },
        { src: 'webimages/lv710/lv710-side.png', alt: 'LV710 Side View' },
        { src: 'webimages/lv710/lv710-inside.png', alt: 'LV710 Details' },
    ],
    'MF1 RF-1660': [
        { src: 'webimages/rf1660/rf1660.png', alt: 'RF-1660 Front View' },
        { src: 'webimages/rf1660/rf1660-gold.png', alt: 'RF-1660 Side View' },
        { src: 'webimages/rf1660/rf1660-details.png', alt: 'RF-1660 Details' },
    ],
    'RF-1620': [
        { src: 'webimages/rf1620/rf1620.png', alt: 'RF-1620 Front View' },
        { src: 'webimages/rf1620/rf1620-gold.png', alt: 'RF-1620 Side View' },
        { src: 'webimages/rf1620/rf1620-details.png', alt: 'RF-1620 Details' },
    ],
    'RF-1320': [
        { src: 'webimages/rf1320/rf1320.png', alt: 'RF-1320 Front View' },
        { src: 'webimages/rf1320/rf1320-black.png', alt: 'RF-1320 Side View' },
        { src: 'webimages/rf1320/rf1320-silver.png', alt: 'RF-1320 Details' },
        { src: 'webimages/rf1320/rf1320-details.png', alt: 'RF-1320 Details' },
    ],
    'MDT-330': [
        { src: 'webimages/mdt330/mdt330.png', alt: 'MDT-330 Front View' },
        { src: 'webimages/mdt330/mdt330-gold.png', alt: 'MDT-330 Side View' },
        { src: 'webimages/mdt330/mdt330-bronze.png', alt: 'MDT-330 Side View' },
        { src: 'webimages/mdt330/mdt330-silver.png', alt: 'MDT-330 Side View' },
        { src: 'webimages/mdt330/mdt330-details.png', alt: 'MDT-330 Details' },
    ],
    'MD-290': [
        { src: 'webimages/md290/md290.png', alt: 'MD-290 Front View' },
        { src: 'webimages/md290/md290-silver.png', alt: 'MD-290 Side View' },
        { src: 'webimages/md290/md290-details.png', alt: 'MD-290 Details' },
    ],
    'MDT-1320': [
        { src: 'webimages/mdt1320/mdt1320.jpg', alt: 'MDT-1320 Front View' },
        { src: 'webimages/mdt1320/mdt1320-black.png', alt: 'MDT-1320 Side View' },
        { src: 'webimages/mdt1320/mdt1320-brown.png', alt: 'MDT-1320 Side View' },
        { src: 'webimages/mdt1320/mdt1320-details.png', alt: 'MDT-1320 Details' },
    ],
    'TDT-1550': [
        { src: 'webimages/tdt1550/tdt1550.png', alt: 'TDT-1550 Front View' },
        { src: 'webimages/tdt1550/tdt1550-gold.png', alt: 'TDT-1550 Side View' },
        { src: 'webimages/tdt1550/tdt1550-details.png', alt: 'TDT-1550 Details' },
    ],
    'MDT-M12': [
        { src: 'webimages/mdtm12/mdtm12-silver.png', alt: 'MDT-M12 Front View' },
        { src: 'webimages/mdtm12/mdtm12-gold.png', alt: 'MDT-M12 Side View' },
        { src: 'webimages/mdtm12/mdtm12-details.png', alt: 'MDT-M12 Details' },
    ],
    'TDT-1330': [
        { src: 'webimages/tdt1330/tdt1330-silver.png', alt: 'TDT-1330 Front View' },
        { src: 'webimages/tdt1330/tdt1330-bronze.png', alt: 'TDT-1330 Side View' },
        { src: 'webimages/tdt1330/tdt1330-details.png', alt: 'TDT-1330 Details' },
    ],
    'TDT-1380': [
        { src: 'webimages/tdt1380/tdt1380-silver.png', alt: 'TDT-1380 Front View' },
        { src: 'webimages/tdt1380/tdt1380-bronze.png', alt: 'TDT-1380 Side View' },
        { src: 'webimages/tdt1380/tdt1380-details.png', alt: 'TDT-1380 Details' },
    ],
    'MDT-1380': [
        { src: 'webimages/mdt1380/mdt1380-silver.png', alt: 'MDT-1380 Front View' },
        { src: 'webimages/mdt1380/mdt1380-bronze.png', alt: 'MDT-1380 Side View' },
        { src: 'webimages/mdt1380/mdt1380-details.png', alt: 'MDT-1380 Details' },
    ],
};

function pickFiles(){
    input.click();
}

function toDataURL(file){
    return new Promise((resolve,reject)=>{
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

input.addEventListener('change', async (e)=>{
    const files = [...e.target.files || []];
    let mapped = 0;

    for (const f of files){
        const name = f.name.toLowerCase();
        const data = await toDataURL(f);

        if (name.includes('5.')) {
            document.documentElement.style.setProperty('--img5', `url('${data}')`);
            mapped++;
            continue;
        }
        if (name.includes('10.')){
            document.documentElement.style.setProperty('--img10',`url('${data}')`);
            mapped++;
            continue;
        }
        if (name.includes('12.')){
            document.documentElement.style.setProperty('--img12',`url('${data}')`);
            mapped++;
            continue;
        }
        if (name.includes('13.')){
            document.documentElement.style.setProperty('--img13',`url('${data}')`);
            mapped++;
            continue;
        }

        if (name.includes('logo') || name.includes('techbay') || name.includes('7ffaac12') ){
            logoEl.src = data;
            mapped++;
            continue;
        }
    }
    statusEl.textContent = `${mapped}/5 ảnh`;
    if (mapped<5) statusEl.textContent += ' (thiếu ảnh nào thì chọn thêm)';
});

function downloadOneFile(){
    const doc = document.documentElement;
    const htmlString = '<!doctype html>\n' + doc.outerHTML;
    const blob = new Blob([htmlString], {type:'text/html'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'techbay-embedded-catalogue.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
}

// Setup image click functionality
function setupImageClicks() {
    const tileImages = document.querySelectorAll('.tile img');

    tileImages.forEach((img) => {
        img.addEventListener('click', function(event) {
            // Get product name from meta div
            const card = img.closest('.card');
            const metaDiv = card ? card.querySelector('.meta') : null;
            const productName = metaDiv ? metaDiv.textContent.trim() : 'Product Image';

            // Get image variants for this product
            const variants = productImageVariants[productName] || [
                { src: img.src, alt: img.alt || productName }
            ];

            // Show image popup with variants and info
            showImagePopup(variants, productName, 0);
        });
    });

    // Also add click for hero image
    const heroImg = document.querySelector('.heroimg img');
    if (heroImg) {
        heroImg.addEventListener('click', function() {
            const variants = [
                { src: heroImg.src, alt: 'Hotel Room Main' },
                { src: 'webimages/hotel-room-2.jpg', alt: 'Hotel Room Alternative' },
                { src: 'webimages/hotel-room-3.jpg', alt: 'Hotel Room Detail' }
            ];
            showImagePopup(variants, 'Hotel Room', 0);
        });
    }
}

// Show image popup with multiple variants and detailed info
function showImagePopup(imageVariants, title, startIndex = 0) {
    currentImageSet = imageVariants;
    currentImageIndex = startIndex;

    const popup = document.getElementById('imagePopup');
    const popupTitle = document.getElementById('popupTitle');

    // Set title
    popupTitle.textContent = `${title} - Product Details`;

    // Update image display
    updatePopupImage();

    // Create thumbnails
    createThumbnails();

    // Update product information
    updateProductInfo(title);

    // Show popup
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Update product information panel
function updateProductInfo(productName) {
    const details = productDetails[productName] || {
        name: productName,
        category: 'Unknown',
        type: 'default'
    };

    const popupRight = document.querySelector('.popup-right');
    popupRight.innerHTML = '';

    if (details.type === 'minibar') {
        // Minibar layout with removed "Thông số kỹ thuật" section
        popupRight.innerHTML = `
            <div class="info-section">
                <h4>Thông tin chung</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Tên sản phẩm</div>
                        <div class="info-value">${details.name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Loại sản phẩm</div>
                        <div class="info-value">${details.category}</div>
                    </div>
                </div>
            </div>

            <div class="info-section">
                <h4>Tính năng nổi bật</h4>
                <ul class="features-list">
                    ${details.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="info-section">
                <h4>Điểm đặc biệt</h4>
                <ul class="specials-list">
                    ${details.specials.map(special => `<li>${special}</li>`).join('')}
                </ul>
            </div>

            <div class="info-section">
                <h4>So sánh các model</h4>
                <div style="overflow-x: auto">
                    <table class="compare-table">
                        <thead>
                            <tr>
                                ${details.compareTable.headers.map(header => `
                                    <th>${header}</th>
                                `).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${details.compareTable.rows.map(row => `
                                <tr>
                                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    } else {
        // Default layout for locks (unchanged)
        popupRight.innerHTML = `
            <div class="info-section">
                <h4>Thông tin chung</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Product Name</div>
                        <div class="info-value">${details.name}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Chất liệu</div>
                        <div class="info-value">${details.category}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Tùy chọn hoàn thiện</div>
                        <div class="info-value">${details.code || '-'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Thân khóa tương thích</div>
                        <div class="info-value">${details.launchDate || '-'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phù hợp cho loại cửa</div>
                        <div class="info-value">${details.char || '-'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Phương thức mở</div>
                        <div class="info-value">${details.require || '-'}</div>
                    </div>
                </div>
            </div>

            <div class="info-section">
                <h4>Thông số kỹ thuật</h4>
                <table class="details-table">
                    <tbody>
                        ${(details.specs || []).map(spec => `
                            <tr>
                                <td>${spec.spec}</td>
                                <td>${spec.detail}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// Update the displayed image
function updatePopupImage() {
    const popupImage = document.getElementById('popupImage');
    const imageCounter = document.getElementById('imageCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const currentImage = currentImageSet[currentImageIndex];

    // Update image
    popupImage.src = currentImage.src;
    popupImage.alt = currentImage.alt;

    // Update counter
    imageCounter.textContent = `${currentImageIndex + 1} / ${currentImageSet.length}`;

    // Update navigation buttons
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === currentImageSet.length - 1;

    // Update active thumbnail
    updateThumbnails();
}

// Create thumbnail navigation
function createThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';

    if (currentImageSet.length <= 1) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'flex';

    currentImageSet.forEach((image, index) => {
        const thumb = document.createElement('img');
        thumb.className = 'thumbnail';
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.onclick = () => goToImage(index);
        container.appendChild(thumb);
    });
}

// Update thumbnail active state
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Navigation functions
function nextImage() {
    if (currentImageIndex < currentImageSet.length - 1) {
        currentImageIndex++;
        updatePopupImage();
    }
}

function previousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updatePopupImage();
    }
}

function goToImage(index) {
    currentImageIndex = index;
    updatePopupImage();
}

// Close image popup
function closeImagePopup() {
    const popup = document.getElementById('imagePopup');
    popup.style.display = 'none';
    document.body.style.overflow = '';

    // Reset
    currentImageSet = [];
    currentImageIndex = 0;
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const popup = document.getElementById('imagePopup');
    if (popup.style.display === 'block') {
        switch(event.key) {
            case 'Escape':
                closeImagePopup();
                break;
            case 'ArrowLeft':
                previousImage();
                event.preventDefault();
                break;
            case 'ArrowRight':
                nextImage();
                event.preventDefault();
                break;
        }
    }
});

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    const popup = document.getElementById('imagePopup');
    if (event.target === popup) {
        closeImagePopup();
    }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', setupImageClicks);

function exportProductData() {
    const data = JSON.stringify(productDetails, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'product-data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
}

function getMostPopularProducts(limit = 5) {
    return Object.entries(productDetails)
        .sort((a, b) => b[1].viewCount - a[1].viewCount)
        .slice(0, limit)
        .map(([name, data]) => ({ name, views: data.viewCount, rating: data.rating }));
}

// Solutions data
const solutionsData = {
    'Hệ thống khách sạn thông minh': {
        title: 'Hệ thống khách sạn thông minh',
        description: 'Giải pháp toàn diện cho quản lý khách sạn hiện đại',
        details: [
            'Hệ thống khóa RFID/MIFARE đồng bộ',
            'Phần mềm quản lý tập trung',
            'Tích hợp với PMS',
            'Báo cáo chi tiết theo thời gian thực',
            'Quản lý quyền truy cập linh hoạt'
        ]
    },
    'Kiểm soát cửa & thang': {
        title: 'Kiểm soát cửa & thang',
        description: 'Giải pháp kiểm soát ra vào chuyên nghiệp',
        details: [
            'Kết nối TCP/IP tiêu chuẩn',
            'Lưu trữ trên 1000 sự kiện',
            'Hỗ trợ nhiều tầng',
            'Tích hợp với hệ thống báo cháy',
            'Quản lý theo thời gian thực'
        ]
    },
    'Phòng khách thông minh': {
        title: 'Phòng khách thông minh',
        description: 'Nâng cao trải nghiệm khách hàng với phòng thông minh',
        details: [
            'Điều khiển chiếu sáng tự động',
            'Quản lý nhiệt độ thông minh',
            'Kịch bản tự động hóa',
            'Tiết kiệm năng lượng',
            'Tích hợp với thiết bị IoT'
        ]
    }
};

// Setup solution card clicks
function setupSolutionClicks() {
    const solutionCards = document.querySelectorAll('#solutions .card');
    solutionCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = card.querySelector('strong').textContent;
            showSolutionsPopup(title);
        });
    });
}

// Show solutions popup
function showSolutionsPopup(title) {
    const popup = document.getElementById('solutionsPopup');
    const solutionTitle = document.getElementById('solutionTitle');
    const solutionContent = document.getElementById('solutionContent');
    
    const solution = solutionsData[title];
    if (!solution) return;

    solutionTitle.textContent = solution.title;
    
    solutionContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p style="font-size: 16px; color: var(--ink); margin-bottom: 20px;">
                ${solution.description}
            </p>
            <h4 style="color: var(--brand); margin-bottom: 10px;">Tính năng chính:</h4>
            <ul style="list-style: none; padding: 0; margin: 0;">
                ${solution.details.map(detail => `
                    <li style="padding: 8px 0; border-bottom: 1px solid var(--line); color: var(--ink);">
                        ${detail}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close solutions popup
function closeSolutionsPopup() {
    const popup = document.getElementById('solutionsPopup');
    popup.style.display = 'none';
    document.body.style.overflow = '';
}

// Initialize solution clicks when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupImageClicks();
    setupSolutionClicks();
});

// Close solutions popup when clicking outside
document.getElementById('solutionsPopup').addEventListener('click', function(event) {
    if (event.target === this) {
        closeSolutionsPopup();
    }
});

// Handle Escape key for solutions popup
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeSolutionsPopup();
    }
});