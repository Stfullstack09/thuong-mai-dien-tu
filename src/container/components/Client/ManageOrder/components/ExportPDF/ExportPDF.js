import React from 'react';
import { Document, Page, View, Text, Link, Font, StyleSheet } from '@react-pdf/renderer';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import FontIP from '../../../../../.././assets/font/Roboto-Italic.ttf';
import { handlePriceDisCount } from '../../../../../../components/handlePriceDisCount';

const styles = StyleSheet.create({
    title: {
        margin: 20,
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#e4e4e4',
        textTransform: 'uppercase',
        fontFamily: 'Oswald',
    },
    body: {
        flexGrow: 1,
        family: 'Oswald',
    },
    row: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    block: {
        flexGrow: 1,
        display: 'block',
    },
    text: {
        width: '60%',
        margin: 10,
        fontFamily: 'Oswald',
        textAlign: 'justify',
    },

    titleText: {
        width: '84%',
        marginTop: 40,
        marginBottom: 30,
        fontFamily: 'Oswald',
        // fontFamily: 'Arial',
        textAlign: 'center',
        fontSize: 14,
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    fill1: {
        width: '40%',
        backgroundColor: '#e14427',
    },
    fill2: {
        flexGrow: 2,
        backgroundColor: '#e6672d',
    },
    fill3: {
        flexGrow: 2,
        backgroundColor: '#e78632',
    },
    fill4: {
        flexGrow: 2,
        backgroundColor: '#e29e37',
    },
    border: {
        borderBottom: 1.2,
        borderColor: '#ccc',
        marginTop: 6,
        marginBottom: 6,
        padding: 10,
    },
    textHello: {
        family: 'Oswald',
    },
    bold: {
        fontWeight: 700,
        fontSize: 18,
    },
    titleOrder: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Oswald',
        fontSize: 12,
        textAlign: 'justify',
        family: 'Oswald',
        marginLeft: 10,
    },
    flex: {
        display: 'flex',
        padding: 10,
    },
    namePro: {
        width: '100%',
        textAlign: 'justify',
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Oswald',
        fontSize: 14,
    },
    price: {
        fontFamily: 'Oswald',
        fontSize: 11,
        color: 'red',
    },
    mail: {
        fontFamily: 'Oswald',
        fontSize: 11,
        marginRight: 10,
    },
    titleWarn: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Oswald',
        color: 'orange',
        marginTop: 15,
        marginBottom: 15,
    },
    margin: {
        marginRight: 10,
    },
    nameContact: {
        marginLeft: 'auto',
        marginBottom: 6,
        paddingRight: 10,
    },
    footer: {
        marginTop: 70,
    },
    center: {
        textAlign: 'center',
        fontFamily: 'Oswald',
        marginBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        opacity: 0.8,
        color: '#ccc',
    },
});

Font.register({
    family: 'Oswald',
    src: FontIP,
});

ExportPDF.propTypes = {
    data: PropTypes.object,
};

function ExportPDF({ data }) {
    useEffect(() => {
        document.title = 'UNOMO Xem Hóa Đơn Khách Hàng';
    }, []);

    const price = handlePriceDisCount(data.price, data.discount);

    return (
        <Document>
            <Page size="A4">
                {!_.isEmpty(data) && (
                    <>
                        <View>
                            <Text style={styles.titleText}>
                                Xin chào anh,chị{' '}
                                {
                                    <Text style={styles.bold}>
                                        "{`${data.userData.firstName} ${data.userData.lastName}`}"
                                    </Text>
                                }{' '}
                                chúng tôi gửi hóa đơn đặt hàng tới anh,chị
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.titleOrder}>
                                Đơn hàng của anh chị đã đặt vào : {new Date(+data.timeOder).toLocaleTimeString('vi-VI')}{' '}
                                ngày {new Date(+data.timeOder).toLocaleDateString('vi-VI')}
                            </Text>
                        </View>
                        <View>
                            <View style={styles.flex}>
                                <Text style={styles.namePro}>Tên sản phẩm : {data.productDataOder.title}</Text>
                                <Text style={styles.price}>
                                    Giá sản phẩm :{' '}
                                    {price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View>
                                <Text style={styles.titleWarn}>
                                    Nếu sản phẩm xảy ra lỗi hoặc bạn muốn khiếu nại hãy liên hệ tới chúng tôi !
                                </Text>
                                <Text style={styles.nameContact}>
                                    <Link href="mailto:truongsonpt.80@gmail.com" style={styles.margin}>
                                        <Text style={styles.mail}>Liên hệ người bán tại đây</Text>
                                    </Link>
                                </Text>
                                <Text style={styles.nameContact}>
                                    <Link href="mailto:truongsonpt.80@gmail.com" style={styles.margin}>
                                        <Text style={styles.mail}>Liên hệ quản trị viên website tại đây</Text>
                                    </Link>
                                </Text>
                                <Text style={styles.nameContact}>
                                    <Link
                                        href="https://chinh-sach-bao-mat-unomo.vercel.app/index.html"
                                        style={styles.margin}
                                    >
                                        <Text style={styles.mail}>Chính sách bảo mật</Text>
                                    </Link>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Text style={styles.center}>UNOMO</Text>
                            <Text style={styles.center}>
                                Thương Mại Điện Tử Với Mọi Nhà, chúng tôi luôn ở bên và đồng hành cùng với bạn
                            </Text>
                            <Text style={styles.center}>location: Thanh Xuân , Hà Nội</Text>
                            <Text style={styles.center}>SDT: 0869224813</Text>
                        </View>
                    </>
                )}
            </Page>
        </Document>
    );
}

export default ExportPDF;
