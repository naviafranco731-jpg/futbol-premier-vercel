/* =============================================
   FÚTBOL PREMIER — script.js v6.0
============================================= */
const $  = id => document.getElementById(id);
const $$ = s  => document.querySelectorAll(s);

let adminLogueado = false;
let rolActual = "cliente";
let carrito       = [];
let solicitudResumenVentas = 0;
let solicitudCaja = 0;
let resumenCajaHoy = { efectivo: 0, qr: 0 };
const PRODUCTOS_INICIALES = [{"id":1779293459401,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1779293449/pb6yj6xeex1bn7yjslrp.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779293452/wvhvysvyvt0qswpcavpd.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779293455/ynguzkqtwhicqjstqlu2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779293456/gpxtx6m7z8cngcrzcxs8.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779293458/pd5qkijw62nqhjpwrmmq.jpg"],"nombre":"Manchester United 2008","tallas":"S-M-L-XL","dorsales":"7 RONALDO","calidad":"RETRO","categoria":"retro","precio":"330","visitas":1},{"id":1779297274853,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1779297266/ntuct8fqwjnimtnm4gwo.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779297268/zmqmfbt9troo0gfaaujy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779297270/uqufvhn2vtsobjxvyazz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779297272/plfl8pflxvrruzsfuvlk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1779297273/xis5isxrzp2gkd5udtwo.jpg"],"nombre":"Barcelona 25/26","tallas":"S-M-L-XL","dorsales":"10 LAMINE YAMAL, 11 RAPHINHA, 8 PEDRI","calidad":"VERSION JUGADOR","categoria":"player","precio":"250","colores":"","descripcion":"","stock":null,"vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null},{"id":1782172292579,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172279/iecfmadi5mru8yrfgmbh.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172280/cracaonudplaqhfop0s9.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172281/nzgbdpizhh4szqzs8esw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172282/nanifjbvrbgez3cglrz9.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172284/ofvbg4vz6h9rijrlxjip.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172286/pev5y2jgmz7ddbfqkpjq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172287/mlv8wat5fgbhbhlrgbd5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172288/dnwnvoaudlqiprbxairi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172290/gzlkvx4zxgnby0rrdmku.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782172291/gkuvoqydytnyeh8hkq24.jpg"],"nombre":"Brasil 2026","tallas":"M,L,XL,XXL","dorsales":"10 Neymar Jr, 7 Vini Jr","calidad":"AAA","colores":"","descripcion":"Camiseta Brasil 2026 Versión Jugador","categoria":"player","precio":"280","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782173053685,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173044/n1liezxhhjqhmao4wxce.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173046/oxyswlq8iu8jm67gmidl.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173047/bumqke5awdvcgs0ehjsj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173048/ou7vgnbfmbw5ldcoxokm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173049/ib7zusx2h9ltlds2t3ea.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173051/jphbrq9vo9q6a2d5vfop.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173053/nivvpvlquxaxljkmxksb.jpg"],"nombre":"Barcelona 25/26","tallas":"S,M,L,XL","dorsales":"10 Lamine Yamal, 8 Pedri, 14 Rashford, 11 Raphinha","calidad":"AAA +","colores":"","descripcion":"Luce los colores del Barça con esta camiseta de excelente calidad AAA+.","categoria":"clubes","precio":"140","vendidos":0,"esOferta":true,"precioOriginal":"200","finOferta":"","stock":"12","agotado":false,"visitas":0},{"id":1782173377297,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173368/ebi7oiyojlbtgho8xk79.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173369/fjrwvahlmorrnn6ng6um.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173370/kouacw2ycxzegdvrc25w.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173372/hwcecgrwfpxjrwttehpq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173373/tt8pkulvoutjbs515uql.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173374/y6loxtrvqvouygo1brt8.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173375/jfr5b9vcjbrwaueeswte.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173376/n7b6k0uradhplohbqppc.jpg"],"nombre":"Santos 11/12","tallas":"S,M,L,XL","dorsales":"11 NEYMAR JR","calidad":"RETRO","colores":"","descripcion":"Revive la época dorada del Santos con esta camiseta clásica.","categoria":"retro","precio":"170","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782173610926,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173601/wcagmwzjo5vbmeaiagpk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173603/ketfdgfv1dkro44eqkwh.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173604/guwuj23jxyvomepqoaam.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173605/nvb9aa6ljfmw3umgnos7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173607/ahsvhzxj9od6tw7hm0md.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173609/qwe8o3pfgabjdqg8cwgw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173610/o2eu0dgfozecqmok4qm.jpg"],"nombre":"Barcelona Total 90 25/26","tallas":"M,L","dorsales":"10 Lamine Yamal, 8 Pedri, 14 Rashford, 11 Raphinha","calidad":"AAA+","colores":"","descripcion":"Un diseño que combina la nueva temporada 2025/26 con el estilo icónico Total 90.","categoria":"clubes","precio":"140","vendidos":0,"esOferta":true,"precioOriginal":"200","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782173956946,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173942/tpqcebmety6mb3o81kuk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173943/v2alcwubfv5j7s8lvzdy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173945/slqalpu5ht4jdv2tbhig.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173946/bnzy3zmcswkzryv5tdqq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173948/yazyfojrxxmbc55de636.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173949/m5m5mm2ltnfsumalzcev.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173951/fmfazsukzrihvou4g71p.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173953/ib3qbzqx8kuh5k2hq7yj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173954/t1jpkxk7wk4pny2ooyqr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782173956/qyzw8panrchbnbqvkuik.jpg"],"nombre":"Barcelona 15/16","tallas":"M,L","dorsales":"11 Neymar Jr","calidad":"RETRO","colores":"","descripcion":"Revive una de las temporadas más históricas del Barça.","categoria":"retro","precio":"230","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782174237300,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174227/gitjfmk4gqs87c8obhfi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174228/ojuf9yge76260wtqgvpz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174229/ds71tb7wzbd23swc20vi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174230/yli7mqrbmoujfv59ti0j.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174231/uyckwzcrufl2rzxe1lsb.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174233/mu3brl0pty6fgys3h2u7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174235/mmxpssq8i6kqisecwqpo.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174236/yvxfyc6v9n6mtmkfhwlx.jpg"],"nombre":"Real Madrid alterna 25/26","tallas":"M,L,XL","dorsales":"10 Mbappe, 5 Bellingham","calidad":"AAA","colores":"","descripcion":"Destaca con la camiseta alterna del Real Madrid 2025/26.","categoria":"retro","precio":"120","vendidos":0,"esOferta":true,"precioOriginal":"180","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782174494138,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174484/fey6xdskaigdfavi7gqm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174485/oygno2ba5yurbfwgj46r.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174486/fh0eoye0mp07pfa75ywe.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174488/keynfggvrorchugqjkvf.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174489/icwgv2walvtzwu2jxufu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174490/zlrkpae1ksjzpcvdshzw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174492/zzfgkepma77dscv4mwrm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174493/ldlrovk4cihys8g7jrco.jpg"],"nombre":"Real Madrid alterna 17/18","tallas":"S,M,L,XL","dorsales":"7 Ronaldo","calidad":"RETRO","colores":"","descripcion":"Revive una temporada inolvidable con la camiseta alterna del Real Madrid 2017/18.","categoria":"retro","precio":"330","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782174633074,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174617/trbmg4tjjtff5wroshhu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174619/vtbhqxb19r1ubg2e8vdn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174621/ebhckmtibm74hngbd2n5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174624/zrxxugc3qvl2jlzt5xgj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174626/zuuchm1q17xr5vqez7q2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174627/cljtxyzj88lu7a2bcf3d.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174630/oudnvq0ctxarazcwtodu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174632/w0lwsokjweqbil4nce96.jpg"],"nombre":"Barcelona 2009","tallas":"S,M,XL","dorsales":"10 Messi","calidad":"RETRO","colores":"","descripcion":"Revive una noche histórica con la camiseta de la Final de 2009.","categoria":"retro","precio":"300","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782174844095,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174834/vt6waafwwlieayqe7pkg.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174836/gurh36od6xrpbl8j0de3.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174837/hzmkflj9lmshguqqoepv.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174838/dfwopd4qn2qadzuewhgw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174839/ca6ghklvkoldwbta2ijk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174841/zjruzotfni6iigsw5kec.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782174843/k0emk2kpixmymirc58xg.jpg"],"nombre":"Portugal alterna 2026","tallas":"M,L,XL,XXL","dorsales":"7 Ronaldo","calidad":"Player Version","colores":"","descripcion":"Luce el estilo de la selección portuguesa con esta camiseta alterna 2026.","categoria":"retro","precio":"280","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782175179060,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175161/sfqzb0rekp0fncnjzane.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175163/jpolfudnvczy7skwaj7s.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175164/ym7nhsce5yjhsnugcnpz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175165/nrsjuvg7tlhsynxrklwa.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175168/powpb1fuoij6n1b6wsfm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175169/mhiziblcbnjblkvmblu4.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175171/xv7g1haj1dxlhpacosot.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175173/gy22qekmwrfjw16ogr1b.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175174/q9ctsv7guk0pk2idrxbs.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175176/pylg5v0imawlp5u2kif9.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175178/yp2xfbetsuoz7herfk6w.jpg"],"nombre":"Barcelona alterna 25/26","tallas":"S,M,L,XL","dorsales":"10 Lamine Yamal, 8 Pedri, 11 Raphinha","calidad":"AAA+","colores":"","descripcion":"Camiseta alterna del FC Barcelona temporada 2025/26.","categoria":"clubes","precio":"140","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782175417021,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175408/rqspaarrq7snzsvuvahq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175409/a1jepdzn6bcdr1tgxsiw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175410/aojfrbjdgys2ngfoxap6.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175411/tzxjoaejms7udmkduwkq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175413/qaxevqcek2f0m1l7nfb0.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175414/a2m0l5vsrgavhmed5rgd.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175416/dhszovieymstf9bh67nv.jpg"],"nombre":"Real Madrid 25/26","tallas":"S,M,L,XL","dorsales":"10 Mbappe, 5 Bellingham, 30 Mastantuono","calidad":"AAA+","colores":"","descripcion":"Nueva camiseta del Real Madrid temporada 2025/26.","categoria":"clubes","precio":"140","vendidos":0,"esOferta":true,"precioOriginal":"200","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782175542481,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175533/jvbcdzxwzc3bovaxjkqw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175534/qhnbpngdhenozpqgbef7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175535/tttls02xetv7suk1wk33.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175537/xid9xfoogseldga4ld5g.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175538/q7kk98qertd1iq9fpy4d.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175540/wrmrxi0mpn14m7dhi2bt.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175541/u4kqqgrhy0jyripoysdx.jpg"],"nombre":"Real Madrid 25/26","tallas":"S,M","dorsales":"8 Valverde, 10 Mbappe","calidad":"AAA","colores":"","descripcion":"Nueva camiseta del Real Madrid temporada 2025/26.","categoria":"clubes","precio":"130","vendidos":0,"esOferta":true,"precioOriginal":"180","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782175886150,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175872/b1fwspkn0pz4bltun2sq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175873/koffih756usyshqecyts.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175874/inliyjfyeyopibcciakl.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175875/w0yvxzpjhpapmlmyipim.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175877/uaw4x6v9mmboj2lfw9ld.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175878/ivsya2vzxxy2qqnjgttf.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175879/w2rsyy1xk2iubwo36rx7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175881/erbr00fcoaevqkyadfp0.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175882/cvko5huqfc1i79rupyc7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175884/b2ztl3wjnl3zmhcz9eq7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782175885/eqmgvvksk5pq8zulyqdo.jpg"],"nombre":"Alemania 2026","tallas":"M,L,XL,XXL","dorsales":"6 Kimmich, 17 Wirtz, 10 Musiala","calidad":"Player Version","colores":"","descripcion":"Camiseta de la selección de Alemania para la temporada 2026.","categoria":"player","precio":"280","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782176071334,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176046/yprusdwnppchrnq5dpkt.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176050/ssirnqvh2r6eewzjmpfq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176052/pqgvoln4zeypuyizfiw3.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176057/ikytk44vely1fugzvwcf.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176059/nzn8xq5p9652x321pdlr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176060/xazypudwoszhuxid66jj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176063/dagxucz2qsykbvazpzcr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176067/lokvp1k6ntwqyh3emmyz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176069/tlvriyabldpb1decgqgz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176070/d30frs5vql1p49dd4ubq.jpg"],"nombre":"Colombia 2026","tallas":"M,L,XL,XXL","dorsales":"10 James, 7 Luis Diaz","calidad":"Player Version","colores":"","descripcion":"Camiseta de la selección de Colombia temporada 2026.","categoria":"player","precio":"280","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782176271723,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176258/wzazujsaxmq91zdjgxvj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176259/qsvcivs2wis3ezwup5mg.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176261/y7xlyeeaugkl1ak5f9vm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176262/ouopqewqi9qfcetza0mf.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176264/dln2sryddhd0721i5g5m.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176265/pqa7ckcbdxwlorbghs2l.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176266/wrg3adh0oci8vm6yx15d.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176268/wibr6dgsgywymwhixjtw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176269/drtxdyno0sbdjaarowih.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176271/kykyk8bjc8prg1yfpkio.jpg"],"nombre":"Barcelona 15/16","tallas":"M,L","dorsales":"10 Messi","calidad":"RETRO","colores":"","descripcion":"Camiseta clásica del FC Barcelona temporada 2015/16.","categoria":"retro","precio":"230","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782176405354,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176394/gtkds00tcl0xkxfo0kbi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176395/o701wam54osuq8yhnt1d.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176396/bn5veqizylpuyr8zv7rm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176397/fgbhebsltlmiazyub4fz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176398/lfb5ifupvm94mx33ildp.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176400/dgqf9i6ovdmumoutl5ae.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176401/auq2njkmdfyf08qjbkve.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176403/yeayclvuf9aumayvhck8.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782176404/kl005mvdatgnvmfyskk1.jpg"],"nombre":"Espana 2026","tallas":"M,L,XL,XXL","dorsales":"19 Lamine Yamal, 20 Pedri","calidad":"Player Version","colores":"","descripcion":"Camiseta de la selección de España para la temporada 2026.","categoria":"player","precio":"280","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782409467997,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409455/mp0eugeiq5gxeeydxugi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409456/ssafqioa0dq5k4n3azke.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409458/qa3tqfd80ggyefnfoffk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409459/tepnnqzijor29up8ratn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409460/iefc5pwvrn5s9yztcuci.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409462/ps3ked7yzkxvlkmvathm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409463/nyel5xzhrcutikwhogr3.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409465/dirvwn4wiljdcv1bx6yg.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409466/lejwpgdrkf9xflxnb2nl.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409468/xvyrlzht7fnv9wqb1gao.jpg"],"nombre":"Real Madrid 3ra 25/26","tallas":"S,M","dorsales":"10 Mbappe, 8 Valverde, 30 Mastantuono","calidad":"AAA","colores":"","descripcion":"Demuestra tu pasión por el Real Madrid con la nueva tercera equipación 2025/26.","categoria":"clubes","precio":"125","vendidos":0,"esOferta":true,"precioOriginal":"180","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782409641345,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409630/geucjzphplsbfkrdankn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409631/hii8qpbwzfbdlmnpnanz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409633/xyzbkfrlaosk85zv5vzi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409634/ir1bqgjjdd73kyotgcps.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409636/cszpsfcnigykqrklcryl.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409637/ia3zeexlogwpdndmywwm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409640/ri1ygv62vljv7yvxhon2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409641/lzx2kxksarr2qgvkhxiq.jpg"],"nombre":"Liverpool 3ra 25/26","tallas":"M,L,XL","dorsales":"11 M.Salah, 7 Wirtz","calidad":"AAA+","colores":"","descripcion":"Luce el estilo de los Reds con la nueva Polera Liverpool 3ra 2025/26.","categoria":"clubes","precio":"140","vendidos":0,"esOferta":true,"precioOriginal":"200","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782409792449,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409780/xgxfot7a5ucpiwk62wfy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409781/a9ov0qyibrrkdeezvpvj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409782/lpdxa2gy6vwwbuxckd2z.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409784/edm2duigpaedfcwzyx8a.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409785/j1dnlyrbevfuvsapztoa.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409787/zhsxofognf7aw3ohejy4.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409788/acfjmyawfgnmznxt4psd.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409790/amkuljxd2su7fcqama2d.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409792/xxnfwewne28hgyighssh.jpg"],"nombre":"Inglaterra 2002","tallas":"M,L,XL","dorsales":"7 Beckham","calidad":"RETRO","colores":"","descripcion":"Revive una de las camisetas más recordadas de la selección inglesa con la Polera Inglaterra 2002.","categoria":"clubes","precio":"200","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782409973617,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409962/qhm1g5bhtnlzketmvsqb.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409963/zyoctajujfyf7xwz6pah.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409965/n5ae927gpyke2m02x0mf.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409967/xb2qcedx9eadmpprp7zb.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409968/vijihcd9igfdrgahgvnr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409970/e2gtg0zsk0tyjxv9ohnx.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409972/zaetbu0ni3sn9fcrqm2y.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782409973/mrpmdwxpgkj9ydblgbjo.jpg"],"nombre":"PSG 25/26","tallas":"XL,XXL","dorsales":"14 D. DOUE, 7 KVARATSKHELIA","calidad":"Player Version","colores":"","descripcion":"Luce los colores del campeón de París con la nueva Polera PSG 2025/26.","categoria":"player","precio":"200","vendidos":0,"esOferta":true,"precioOriginal":"280","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410103933,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410091/lk4lfikpkmbtwakryxpw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410093/aevo7jbnpstxyimmo2os.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410094/a37azzv1wwilaaeivb1o.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410095/iheuv3wp7izha2qxppnw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410097/wa7gbsfdwhjf3p2d5ekt.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410098/ckxizqytxrmeb04uqa8j.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410099/zvz710rdgfpsbnoby0mb.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410102/lo82vexog5mry7liiui5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410104/cznzkeeh6ptniqa2ycta.jpg"],"nombre":"Portugal 2006","tallas":"M,L,XL","dorsales":"17 C. Ronaldo","calidad":"RETRO","colores":"","descripcion":"Revive la elegancia de una generación histórica con la Polera Portugal 2006.","categoria":"retro","precio":"300","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410262304,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410250/dpehnrqqoema4fmnpq0y.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410252/w5w5gbsdvuuia9axeoob.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410253/ihiraj6csspjxgtelvco.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410254/qamvlfm0oq9ppocjqcej.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410257/te4qrfxb7ybpnavfz2zn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410259/bhajzfnqgsiwxrzh4yvu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410262/p67yikh7x5eo1ddeblxp.jpg"],"nombre":"Argentina alterna 2026","tallas":"S,M,L,XL","dorsales":"10 Messi","calidad":"AAA","colores":"","descripcion":"Luce los colores de la Albiceleste con la Polera Argentina Alterna 2026.","categoria":"selecciones","precio":"180","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410369181,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410355/ulhjmmyxtvy3gqczptg9.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410358/soc5na3usmgcktwptnme.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410360/brh8x2duigziaer4p2np.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410362/oo2lr2xmqypmcfhpiklc.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410363/d3p5vhzg1rjxnj3430mw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410364/dkuyh8smarbltvaekh93.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410366/injohy4cga0jx7kkuagy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410367/upwyua1lzeudes10s783.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410369/zmsxdjvofjihjk5ppcbf.jpg"],"nombre":"Mexico 2026","tallas":"S,M,L,XL","dorsales":"SIN NUMERO","calidad":"AAA+","colores":"","descripcion":"Demuestra tu orgullo por el Tri con la Polera México 2026.","categoria":"selecciones","precio":"180","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410461451,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410450/mejv04fqdphojcifytqe.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410451/zvpwjd4ermryhhuyaieu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410453/slwrpjzn1yzhvkniyo1m.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410455/reluytuxe6uerrhnansn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410456/cspqxjliatac5njd3zkq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410458/yk8hc3iqdvvppxymamgq.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410459/eg2ieqcry7b3g8dnaoni.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410461/btz1yhepplc5xfkddlng.jpg"],"nombre":"Espana 2026","tallas":"S,M,L,XL","dorsales":"SIN NUMERO, 19 Lamine Yamal","calidad":"AAA+","colores":"","descripcion":"Lleva la pasión de La Roja con la Polera España 2026.","categoria":"selecciones","precio":"200","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410625890,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410615/jfdxinjiufvuaggfb5uc.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410617/efdtgrm80geipsrazhlg.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410618/a9otwqtrtnqkeubpdyod.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410621/mnc5xlukyp5lv0windo2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410622/gvjhd5ahgmasdvhuogwe.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410624/ak6tqlfhkm51zxzzzgvi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410626/xbzhpjao7io5sioldrp0.jpg"],"nombre":"Real Madrid alterna 13/14","tallas":"M,L","dorsales":"7 Ronaldo","calidad":"RETRO","colores":"","descripcion":"Revive una temporada histórica con la Polera Real Madrid Alterna 2013/14.","categoria":"retro","precio":"250","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410710477,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410701/mezwelh2euhlfmesvbj7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410702/vi1hxrs2kax6pjfufngx.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410704/yeaumwfalllscr0sowvp.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410705/gbhftybjaeqqylxdkpyy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410706/oussjibdmsuqzgylf2my.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410708/cgjsbp4m2uq82ll9apex.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410710/ry8u8e1l0yz5lx9tc9ze.jpg"],"nombre":"Real Madrid 17/18","tallas":"M,L","dorsales":"7 Ronaldo","calidad":"RETRO","colores":"","descripcion":"Revive una temporada legendaria con la Polera Real Madrid 2017/18.","categoria":"retro","precio":"250","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782410817517,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410807/xff2mtx9dwbsavggbh8w.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410808/rnhwtceaqfy2at0r0tf2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410809/gdvvjstc5cjbxuey1cex.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410811/ybfeyhl7bvuzauptm2x8.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410813/v44xngocimt6m7rjymty.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410814/stdok3dzzjkilyh0cc5l.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410816/jkhli4koejoiwwbz6vwu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782410817/awve3mebgy1dujmgdwgu.jpg"],"nombre":"Inglaterra alterna 2026","tallas":"S,M,L","dorsales":"10 Bellingham","calidad":"AAA","colores":"","descripcion":"Luce el estilo de los Three Lions con la Polera Inglaterra Alterna 2026.","categoria":"selecciones","precio":"180","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782411021769,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411009/ylkwwlb0tnx4a0mceq18.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411011/l0bllx7cmeetqptmqv7s.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411013/xencrwher3grdorgjcfj.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411014/zqi1jtreeh7tqx92pc5r.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411016/duvowyhp9wbtuorwlisx.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411018/uf5uf46o1subcbcyrgkl.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411019/gbtentyysaoykhl8rxvo.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411021/b4ysib6wjqjl3dumxjsx.jpg"],"nombre":"Corinthians 24/25","tallas":"S,M,L,XL","dorsales":"10 Memphis","calidad":"AAA","colores":"","descripcion":"Luce los colores del Timão con la Polera Corinthians 2024/25.","categoria":"clubes","precio":"100","vendidos":0,"esOferta":true,"precioOriginal":"180","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782411143582,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411131/fpddskxpbnr8pgwqf6sr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411132/i07axaxshzlisqbh4nzn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411134/q7qa9ep1tqt3d3olzb7e.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411136/gcunmltit7xok8r8wpxm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411137/s2doczvgoysjdfprwudb.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411140/bymofbl59t07myoeg6g7.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411142/grt07orxrqzbdqtseaur.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411143/m1r7n2eswmex2tljmue9.jpg"],"nombre":"Barcelona 1999","tallas":"S,M,L,XL","dorsales":"11 Rivaldo","calidad":"RETRO","colores":"","descripcion":"Revive el estilo clásico del final de los años 90 con la Polera Barcelona 1999.","categoria":"retro","precio":"280","vendidos":0,"esOferta":true,"precioOriginal":"300","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782411553195,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411542/azelnlo1khjzvjc7oxlz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411543/nr3y1g8zanhwll2gross.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411544/zdk0klhpoacoznlfacbu.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411545/qtnuw7zvktsuwjyqsuud.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411547/r1bjpy940jffflxcp1r5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411548/b4dewqeqlow6u8fntktp.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411549/pcvyc6un9gu5uywewnqw.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411551/wwmfs3ke3fo1ivhn4mll.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411553/dgkzdct6rkrr9lzycuvw.jpg"],"nombre":"Real Madrid 125 Anos","tallas":"M,L,XL","dorsales":"10 Mbappe, 5 Bellingham, 7 Vini Jr","calidad":"AAA","colores":"","descripcion":"Celebra la historia del club más grande del mundo con la Polera Real Madrid 125 Años.","categoria":"clubes","precio":"160","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":1},{"id":1782411653052,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411644/py1ityqkelpldvjpevis.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411645/nog4vn7ag6rjzlflltlm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411646/n279bmoizzuybodd6wzc.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411647/hxxeut1o2zh6cjenbeq5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411649/n1hzleskyek2pcbdzn1g.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411650/fdncwlfxza1bnhemsnzy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411651/ni65lm6nij8p1vgwfgmn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411653/oap1yqy2fbbtwdo28d9a.jpg"],"nombre":"Espana alterna 2026","tallas":"M,L,XL","dorsales":"19 Lamine Yamal, 20 Pedri","calidad":"AAA","colores":"","descripcion":"Luce la identidad de La Roja con la Polera España Alterna 2026.","categoria":"selecciones","precio":"180","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782411767520,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411755/kjicfkannoadnj9gi4qg.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411756/dqtziz0blybrarofbtib.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411758/kxjhng8yf18lao6xubav.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411761/qe8xylhkij7mzigrueeo.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411762/vltekpcjqb9bcjl1tw7u.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411764/pysmb9ifl8b6couffkp2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411766/qmbcfaxopdabi0fayg0k.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782411767/fdfbbtyebylvurgibf2q.jpg"],"nombre":"Inglaterra 2026","tallas":"M","dorsales":"10 Bellingham","calidad":"AAA","colores":"","descripcion":"Luce los colores de los Three Lions con la Polera Inglaterra 2026.","categoria":"selecciones","precio":"180","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782781244564,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781232/vyx1mbjcoid6kjix1jxs.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781233/tbm4pitsagxlh0mgrast.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781235/fwncvftfex5rwgtw4gg4.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781237/ea7id4mcexhlkhzhtu25.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781238/rp66aplwto3idgoullr6.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781241/jjflpvlqoxls035idfrm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781243/fciafqictrmv0n08srwe.jpg"],"nombre":"Inter Miami alterna 24/25","tallas":"S,M,L,XL","dorsales":"10 Messi","calidad":"AAA","colores":"","descripcion":"Luce el estilo del Inter Miami con la Polera Alterna 24/25.","categoria":"clubes","precio":"100","vendidos":0,"esOferta":true,"precioOriginal":"170","finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782781444449,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781429/uneehjvczzdufj5pwhvr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781431/x7zwhmetfduduckmtvfy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781433/rkhabfv1puwl16t9vrat.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781435/nyw9wq9vre8r1c9o9llk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781436/ttmfbjsb1awzjuizxvxy.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781438/juxcn5eap02bv1hnuhzr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781440/cxcvtwhlorv6yq7jfvdv.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781443/gfyurx9ljtss0atue7q3.jpg"],"nombre":"Barcelona alterna 24/25","tallas":"M,L","dorsales":"19 Lamine Yamal, Sin Numero","calidad":"AAA","colores":"","descripcion":"Luce un estilo único con la Polera Barcelona Alterna 24/25.","categoria":"clubes","precio":"100","vendidos":0,"esOferta":true,"precioOriginal":"170","finOferta":"","stock":null,"agotado":false,"visitas":0},{"id":1782781555546,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781545/phfj8j27sm3mq3bqk9m5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781546/lgxoxnms8gmgocclibit.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781547/mlivtmkz9nrlg2j37oli.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781549/wl674gowk3agakbvwd9d.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781551/a9jubhpqhbmuqlanfiu9.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781552/pyk994pdpdxplwuohk20.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781554/dxchoavbdttqyyhkjl3m.jpg"],"nombre":"Croacia alterna 2026","tallas":"M","dorsales":"10 Modric","calidad":"AAA","colores":"","descripcion":"Luce la nueva Polera Croacia Alterna 2026.","categoria":"clubes","precio":"170","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782781681017,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781669/vnimwwogumb1mwkothyt.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781670/duwake5vwpfnndgaxjck.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781671/fg5uidkvpmadsaeydgdn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781672/o7rr0zcepsalacpzjbu2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781673/m2h41xb1u32qzapjqymi.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781675/iryavppsmedjee9mkjl2.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781676/w1lu7pkgugf0mbjmokjk.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781677/uzl9kqyotwv2dwgjok7w.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781679/tejekyokpeeaen8wyqer.jpg"],"nombre":"Ecuador 2026","tallas":"M","dorsales":"23 M. Caicedo","calidad":"AAA","colores":"","descripcion":"Luce la nueva Polera Ecuador 2026.","categoria":"selecciones","precio":"180","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782781796593,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781785/tfjy0j9legf0zzpfwgr5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781786/x8nacrtxo3lxs8ivhujz.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781788/so0vl2b6f4qskxiyc2v5.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781790/z15yjqeh0pqw9bhqhdjm.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781791/qdjtpmn7tuhfcqqz4rpf.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781793/fkf83wtjj2dwrmungpok.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781795/jzqwwxjftvn1itqzw8w2.jpg"],"nombre":"Liverpool conmemorativa","tallas":"M","dorsales":"Sin Numero","calidad":"AAA","colores":"","descripcion":"Luce la Camiseta Conmemorativa Liverpool Negra.","categoria":"clubes","precio":"170","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782781940092,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781924/afdd7uaujz2hfochumye.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781925/qlyfbyr1yrwh7oybq2ge.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781928/spov4teusy2gr2vds98b.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781930/owz7gnc5i69ce4w2bchc.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781932/hu8pvs47n8cyrj2ajzoh.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781934/lpukaadz9qmefisulvs8.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781935/noum2ju0ykzo9biel9ve.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781937/kwkuyk4tcnbnzczyino4.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782781938/pp1tp4uemg4k2phbjs3i.jpg"],"nombre":"Portugal 2026","tallas":"S,M,L,XL","dorsales":"7 RONALDO","calidad":"AAA","colores":"","descripcion":"Luce la nueva Polera Portugal 2026.","categoria":"selecciones","precio":"170","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0},{"id":1782782080032,"imagenes":["https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782066/lyrvnmluydqnhcuspubt.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782067/arsaxvvepslt6s1efarr.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782069/xrdex2roojww0pctvb02.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782070/z9grwnh4asnxfxtmmhfd.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782072/zktmz9jjrnuaormunrra.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782073/rsub2ds6un1rlxq3gmzn.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782075/pj8a3sj9xv6ikhg2m0pa.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782077/t98vscjzjaorfaqrnhh6.jpg","https://res.cloudinary.com/dxcfq1mln/image/upload/v1782782078/jojyzmniwyitorumoy5t.jpg"],"nombre":"Colombia 2026","tallas":"S,M,L,XL","dorsales":"7 Luis Diaz, Sin Numero","calidad":"AAA+","colores":"","descripcion":"Luce la nueva Polera Colombia 2026.","categoria":"selecciones","precio":"200","vendidos":0,"esOferta":false,"precioOriginal":null,"finOferta":null,"stock":null,"agotado":false,"visitas":0}];
let productos     = JSON.parse(localStorage.getItem("productos")) || PRODUCTOS_INICIALES;
let historial     = JSON.parse(localStorage.getItem("historial"))  || [];
let cupones       = JSON.parse(localStorage.getItem("cupones"))    || [];
let favoritos     = JSON.parse(localStorage.getItem("favoritos"))  || [];
let resenas       = JSON.parse(localStorage.getItem("resenas"))    || [];
let cuponAplicado = null;
let countdownInterval = null;
let estrellasVal  = 0;
let compararLista = [];
const ADMIN_EMAIL = "naviafranco731@gmail.com";
const ADMIN_UID = "gvP0Hsrh1pTtOAwr5ewCy3NEwdn1";
let usuarioActual = null;
let perfilActual = null;
let vistaCuenta = "ingresar";
let encargoFotoPreviewUrl = "";
const ROLES_PERSONAL = ["admin", "cajero", "empleado"];
const ESTADOS_PEDIDO = ["pendiente", "confirmado", "preparando", "enviado", "completado", "cancelado"];

function esPersonal() {
    return ROLES_PERSONAL.includes(rolActual);
}

function etiquetaRol(rol) {
    return ({ admin: "Administrador", cajero: "Cajero", empleado: "Empleado" })[rol] || "Cliente";
}

function abrirPanelAdministracion() {
    if (!esPersonal()) return;
    $$(".vista-activa").forEach(elemento => elemento.classList.remove("vista-activa"));
    $("admin-panel").classList.add("vista-activa");
    document.body.classList.add("vista-seccion");
    document.body.dataset.vista = "admin-panel";
    history.replaceState(null, "", "#admin-panel");
    window.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(() => requestAnimationFrame(ajustarVistaCompleta));
    configurarAccesoPanel();
}

function configurarAccesoPanel() {
    const botones = [...document.querySelectorAll(".admin-tabs .atab")];
    botones.forEach(btn => {
        const permitido = (btn.dataset.roles || "admin").split(" ").includes(rolActual);
        btn.hidden = !permitido;
        btn.disabled = !permitido;
        const panel = $("tab-" + btn.dataset.tab);
        if (panel) panel.hidden = !permitido;
    });
    document.querySelectorAll("[data-admin-only]").forEach(elemento => {
        elemento.hidden = !adminLogueado;
    });
    const vistaInicial = rolActual === "cajero" ? "clientes" : "agregar";
    const actual = botones.find(btn => btn.classList.contains("activo") && !btn.hidden);
    const seleccion = actual || botones.find(btn => btn.dataset.tab === vistaInicial && !btn.hidden);
    if (seleccion) activarTabAdmin(seleccion);
    $("admin-stats").hidden = !esPersonal();
    $("admin-alertas-stock").hidden = !esPersonal();
    $("admin-identidad-nombre").textContent =
        perfilActual?.usuario || usuarioActual?.displayName || usuarioActual?.email || "Usuario";
    $("admin-identidad-rol").textContent = etiquetaRol(rolActual);
    if (esPersonal()) renderAdminStats();
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, caracter => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[caracter]);
}

function mostrarCuenta(vista = "ingresar") {
    vistaCuenta = vista;
    $("cuenta-modal").style.display = "flex";
    $("cuenta-mensaje").textContent = "";
    $("cuenta-registro-campos").style.display = vista === "registrar" ? "block" : "none";
    $("cuenta-submit").textContent = vista === "registrar" ? "Crear cuenta" : "Ingresar";
    $("cuenta-password").setAttribute("autocomplete", vista === "registrar" ? "new-password" : "current-password");
    $("cuenta-email").type = vista === "registrar" ? "email" : "text";
    $("cuenta-email").placeholder = modoPersonal && vista === "ingresar" ? "Correo o usuario del personal" : "tu@correo.com";
$("cuenta-email-label").textContent = modoPersonal && vista === "ingresar" ? "Correo o usuario del personal" : "Correo electrónico";
    $("cuenta-captcha-wrap").style.display = vista === "registrar" ? "none" : "grid";
    if (vista === "ingresar") generarCodigoCaptchaVisual();
    else {
        codigoCaptchaVisual = "";
        $("cuenta-captcha-respuesta").value = "";
    }
    $$(".cuenta-tab").forEach(b => b.classList.toggle("activo", b.dataset.cuentaVista === vista));
}

let codigoCaptchaVisual = "";
function generarCodigoCaptchaVisual() {
    const caracteres = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    codigoCaptchaVisual = Array.from({ length: 5 }, () =>
        caracteres[Math.floor(Math.random() * caracteres.length)]
    ).join("");
    $("cuenta-captcha-respuesta").value = "";
    const canvas = $("cuenta-captcha-imagen");
    const contexto = canvas.getContext("2d");
    if (!contexto) {
        codigoCaptchaVisual = "";
        $("cuenta-mensaje").textContent = "No se pudo mostrar el CAPTCHA. Recarga la página e inténtalo otra vez.";
        return;
    }
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.fillStyle = "#e8edf4";
    contexto.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 5; i++) {
        contexto.beginPath();
        contexto.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        contexto.bezierCurveTo(
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height,
            Math.random() * canvas.width, Math.random() * canvas.height
        );
        contexto.strokeStyle = "rgba(55, 75, 110, 0.28)";
        contexto.lineWidth = 1 + Math.random();
        contexto.stroke();
    }

    Array.from(codigoCaptchaVisual).forEach((caracter, indice) => {
        contexto.save();
        contexto.translate(30 + indice * 48, 49 + Math.random() * 9);
        contexto.rotate((Math.random() - 0.5) * 0.3);
        contexto.font = `bold ${30 + Math.floor(Math.random() * 7)}px Georgia`;
        contexto.fillStyle = ["#173d68", "#3c285f", "#27384b"][indice % 3];
        contexto.fillText(caracter, 0, 0);
        contexto.restore();
    });
}

function describirErrorFirebase(error) {
    const mensajes = {
        "auth/email-already-in-use": "Ese correo ya tiene una cuenta.",
        "auth/invalid-email": "El correo no tiene un formato válido.",
        "auth/weak-password": "La contraseña debe tener al menos 8 caracteres.",
        "auth/user-not-found": "No existe una cuenta con esos datos.",
        "auth/wrong-password": "La contraseña es incorrecta.",
        "auth/invalid-credential": "Correo o contraseña incorrectos.",
        "auth/too-many-requests": "Se bloquearon temporalmente los intentos. Vuelve a probar más tarde.",
        "auth/network-request-failed": "No se pudo conectar. Revisa tu conexión.",
        "database/permission-denied": "Firebase rechazó el acceso. Verifica las reglas de seguridad del proyecto."
    };
    return mensajes[error.code] || `No se pudo completar la operación (${error.code || "error"}).`;
}

function renderCuentaPerfil() {
    const form = $("cuenta-form");
    const perfil = $("cuenta-perfil");
    if (!usuarioActual) {
        form.style.display = "block";
        perfil.style.display = "none";
        return;
    }
    form.style.display = "none";
    aplicarModoPersonal(false);
    perfil.style.display = "block";
    const nombreGuardado = perfilActual?.usuario;
    const nombre = nombreGuardado
        ? nombreGuardado.charAt(0).toUpperCase() + nombreGuardado.slice(1)
        : usuarioActual.displayName || usuarioActual.email;
    const verificacion = usuarioActual.email === ADMIN_EMAIL || usuarioActual.emailVerified
        ? "Correo verificado"
        : "Correo pendiente de verificación";
    perfil.innerHTML = `<div class="cuenta-perfil-datos">
        <p>Usuario: <strong>${escaparHTML(nombre)}</strong></p>
        <p>Correo: <strong>${escaparHTML(usuarioActual.email)}</strong></p>
        <p>ID de cliente: <strong>${escaparHTML(usuarioActual.uid)}</strong></p>
        <p>${verificacion}</p>
    </div>
    <div class="cuenta-acciones">
        ${esPersonal() ? '<button type="button" id="cuenta-abrir-admin">Abrir panel de trabajo</button>' : ""}
        ${usuarioActual.emailVerified || usuarioActual.email === ADMIN_EMAIL ? "" : '<button type="button" id="reenviar-verificacion">Enviar correo de verificación</button>'}
        <button type="button" id="cuenta-ver-pedidos">📋 Ver mis pedidos</button>
        <button type="button" id="cuenta-cerrar-sesion">Cerrar sesión</button>
    </div>
    <p class="cuenta-ayuda" id="cuenta-perfil-mensaje" role="status"></p>`;
    const reenviar = $("reenviar-verificacion");
    if (reenviar) reenviar.addEventListener("click", async () => {
        try {
            await usuarioActual.sendEmailVerification();
            $("cuenta-perfil-mensaje").textContent = "Correo de verificación enviado. Revisa también la carpeta de spam.";
        } catch (error) {
            $("cuenta-perfil-mensaje").textContent = describirErrorFirebase(error);
        }
    });
    const abrirAdmin = $("cuenta-abrir-admin");
    if (abrirAdmin) abrirAdmin.addEventListener("click", () => {
        $("cuenta-modal").style.display = "none";
        abrirPanelAdministracion();
    });
    $("cuenta-ver-pedidos").addEventListener("click", () => verPedidosCliente());
    $("cuenta-cerrar-sesion").addEventListener("click", async () => {
        try {
            await auth.signOut();
            $("cuenta-modal").style.display = "none";
            mostrarToast("Sesión cerrada");
        } catch (error) {
            $("cuenta-perfil-mensaje").textContent = describirErrorFirebase(error);
        }
    });
}

async function actualizarSesionFirebase(usuario) {
    usuarioActual = usuario;
    perfilActual = null;
    adminLogueado = Boolean(usuario && ADMIN_UID && usuario.uid === ADMIN_UID && usuario.email === ADMIN_EMAIL);
    rolActual = adminLogueado ? "admin" : "cliente";
    if (usuario && !adminLogueado) {
        try {
            const token = await usuario.getIdTokenResult();
            if (["cajero", "empleado"].includes(token.claims.role)) rolActual = token.claims.role;
        } catch (error) {
            mostrarToast(`No se pudo verificar tu rol: ${describirErrorFirebase(error)}`);
            console.error("Error al verificar el rol de la cuenta:", error);
        }
    }
    if (!esPersonal() && document.body.dataset.vista === "admin-panel") {
        $("admin-panel").classList.remove("vista-activa");
        document.body.classList.remove("vista-seccion");
        delete document.body.dataset.vista;
    }
    if (usuario && !adminLogueado && !esPersonal()) {
        try {
            const snapshot = await db.ref(`usuarios/${usuario.uid}`).once("value");
            perfilActual = snapshot.val();
        } catch (error) {
            mostrarToast(`No se pudo cargar tu perfil: ${describirErrorFirebase(error)}`);
        }
    }
    $("abrir-cuenta").textContent = usuario ? "Mi cuenta" : "Ingresar / Mi cuenta";
    $("admin-panel").style.display = esPersonal() ? "block" : "none";
    renderCuentaPerfil();
    if (esPersonal()) abrirPanelAdministracion();
    if (adminLogueado) {
        renderProductos(productos);
        renderOfertas();
        renderListaAdmin();
        db.ref("productos").once("value").then(snapshot => {
            if (snapshot.val() === null) return db.ref("productos").set(productos);
            return null;
        }).catch(error => {
            mostrarToast(`No se pudo sincronizar el inventario: ${describirErrorFirebase(error)}`);
            console.error("Error al inicializar el inventario:",error);
        });
    } else {
        renderProductos(productos);
        renderOfertas();
    }
}

auth.onAuthStateChanged(usuario => {
    actualizarSesionFirebase(usuario);
    actualizarAccesoEncargos(usuario);
});

function actualizarAccesoEncargos(usuario) {
    const mensaje = $("encargo-mensaje");
    if (!usuario) {
        mensaje.textContent = "Inicia sesión y verifica tu correo para enviar un encargo.";
        return;
    }
    if (usuario.uid === ADMIN_UID || usuario.emailVerified) {
        mensaje.textContent = `Tu solicitud se asociará a tu cuenta${perfilActual?.usuario ? ` (${perfilActual.usuario})` : ""}. Te contactaremos al correo registrado.`;
        return;
    }
    mensaje.textContent = "Verifica tu correo desde Mi cuenta antes de enviar el encargo.";
}

$("encargo-form").addEventListener("submit", async event => {
    event.preventDefault();
    const mensaje = $("encargo-mensaje");
    const boton = $("encargo-enviar");
    const user = auth.currentUser;
    if (!user) {
        mostrarCuenta("ingresar");
        mensaje.textContent = "Inicia sesión o crea una cuenta para enviar tu encargo.";
        return;
    }
    try {
        await user.reload();
        await user.getIdToken(true);
    } catch (error) {
        mensaje.textContent = describirErrorFirebase(error);
        return;
    }
    const cuenta = auth.currentUser;
    if (!cuenta || (cuenta.uid !== ADMIN_UID && !cuenta.emailVerified)) {
        mensaje.textContent = "Verifica tu correo antes de enviar el encargo. Puedes solicitar otro mensaje desde Mi cuenta.";
        return;
    }
    const camiseta = $("encargo-camiseta").value.trim();
    const talla = $("encargo-talla").value;
    const nombrePersonalizado = $("encargo-nombre").value.trim();
    const dorsal = $("encargo-dorsal").value.trim();
    const notas = $("encargo-notas").value.trim();
    const foto = $("encargo-foto").files[0] || null;
    if (!camiseta || camiseta.length > 80 || !talla || nombrePersonalizado.length > 20 || notas.length > 500 || (dorsal && !/^\d{1,2}$/.test(dorsal))) {
        mensaje.textContent = "Revisa la camiseta, talla y personalización; el dorsal debe tener 1 o 2 números.";
        return;
    }
    if (foto && (!["image/jpeg", "image/png", "image/webp"].includes(foto.type) || foto.size > 5 * 1024 * 1024)) {
        mensaje.textContent = "La foto debe ser JPG, PNG o WebP y pesar como máximo 5 MB.";
        return;
    }
    boton.disabled = true;
    boton.textContent = "Enviando solicitud…";
    try {
        const solicitudRef = db.ref(`encargos/${cuenta.uid}`).push();
        if (!solicitudRef.key) throw new Error("No se pudo crear el identificador del encargo.");
        const solicitud = {
            uid: cuenta.uid,
            correo: cuenta.email,
            usuario: perfilActual?.usuario || cuenta.displayName || "",
            camiseta,
            talla,
            nombrePersonalizado,
            dorsal,
            notas,
            fotoPath: "",
            estado: "pendiente",
            fecha: new Date().toISOString()
        };
        await solicitudRef.set(solicitud);
        const whatsappLink = document.createElement("a");
        whatsappLink.className = "encargo-whatsapp-link";
        whatsappLink.target = "_blank";
        whatsappLink.rel = "noopener noreferrer";
        const whatsappText = [
            `Hola, envié el encargo #${solicitudRef.key}.`,
            `Camiseta: ${camiseta}`,
            `Talla: ${talla}`,
            `Nombre: ${nombrePersonalizado || "Sin personalizar"}`,
            `Dorsal: ${dorsal || "Sin dorsal"}`,
            notas ? `Detalles: ${notas}` : ""
        ].filter(Boolean).join("\n");
        whatsappLink.href = `https://wa.me/59171208827?text=${encodeURIComponent(whatsappText)}`;
        whatsappLink.textContent = foto ? "📲 Enviar foto de referencia por WhatsApp" : "📲 Consultar mi encargo por WhatsApp";
        $("encargo-form").reset();
        $("encargo-foto-preview").hidden = true;
        $("encargo-foto-preview").replaceChildren();
        if (encargoFotoPreviewUrl) URL.revokeObjectURL(encargoFotoPreviewUrl);
        encargoFotoPreviewUrl = "";
        mensaje.replaceChildren(
            document.createTextNode(foto
                ? "✅ ¡Solicitud guardada! Pulsa el botón para abrir WhatsApp y adjunta allí la foto que elegiste. "
                : "✅ ¡Solicitud enviada! El administrador la revisará y te contactará para confirmar precio y disponibilidad. "),
            whatsappLink
        );
    } catch (error) {
        mensaje.textContent = `No se pudo enviar el encargo: ${describirErrorFirebase(error)}`;
        console.error("Error al guardar encargo:", error);
    } finally {
        boton.disabled = false;
        boton.textContent = "⚽ Enviar mi encargo";
    }
});

$("encargo-foto").addEventListener("change", () => {
    const foto = $("encargo-foto").files[0];
    const preview = $("encargo-foto-preview");
    if (encargoFotoPreviewUrl) URL.revokeObjectURL(encargoFotoPreviewUrl);
    encargoFotoPreviewUrl = "";
    preview.replaceChildren();
    preview.hidden = true;
    if (!foto) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(foto.type) || foto.size > 5 * 1024 * 1024) {
        $("encargo-mensaje").textContent = "La foto debe ser JPG, PNG o WebP y pesar como máximo 5 MB.";
        $("encargo-foto").value = "";
        return;
    }
    encargoFotoPreviewUrl = URL.createObjectURL(foto);
    const imagen = document.createElement("img");
    imagen.src = encargoFotoPreviewUrl;
    imagen.alt = "Vista previa de la foto de referencia";
    preview.appendChild(imagen);
    preview.hidden = false;
});

$("abrir-cuenta").addEventListener("click", () => {
    mostrarCuenta(usuarioActual ? vistaCuenta : "ingresar");
    renderCuentaPerfil();
});
function cerrarCuentaModal() {
    $("cuenta-modal").style.display = "none";
    aplicarModoPersonal(false);
}
$("cerrar-cuenta").addEventListener("click", cerrarCuentaModal);
$("cuenta-modal").addEventListener("click", event => {
    if (event.target === $("cuenta-modal")) cerrarCuentaModal();
});
$$(".cuenta-tab").forEach(button => button.addEventListener("click", () => {
    mostrarCuenta(button.dataset.cuentaVista);
}));
$("cuenta-captcha-nuevo").addEventListener("click", () => {
    generarCodigoCaptchaVisual();
    $("cuenta-mensaje").textContent = "";
});
$("cuenta-submit").addEventListener("click", async () => {
    const identificador = $("cuenta-email").value.trim();
    const email = identificador.toLowerCase() === "futadmi" ? ADMIN_EMAIL : identificador.toLowerCase();
    const password = $("cuenta-password").value;
    const usuario = $("cuenta-usuario").value.trim();
    const salida = $("cuenta-mensaje");
    salida.textContent = "";
    if (vistaCuenta === "ingresar") {
        if (!codigoCaptchaVisual) {
            salida.textContent = "No se pudo generar el CAPTCHA. Recarga la página e inténtalo otra vez.";
            return;
        }
        if ($("cuenta-captcha-respuesta").value.trim().toUpperCase() !== codigoCaptchaVisual) {
            generarCodigoCaptchaVisual();
            salida.textContent = "El código no coincide. Inténtalo con el nuevo CAPTCHA.";
            return;
        }
        generarCodigoCaptchaVisual();
    }
    if (vistaCuenta === "registrar") {
        if (!/^[a-zA-Z0-9_-]{3,20}$/.test(usuario)) {
            salida.textContent = "El usuario debe tener 3–20 caracteres: letras, números, guion o guion bajo.";
            return;
        }
        if (usuario.toLowerCase() === "futadmi" || email === ADMIN_EMAIL) {
            salida.textContent = "Ese nombre de usuario está reservado.";
            return;
        }
        if (!email || password.length < 8) {
            salida.textContent = "Ingresa un correo válido y una contraseña de al menos 8 caracteres.";
            return;
        }
        let credencial;
        let claveUsuario;
        try {
            credencial = await auth.createUserWithEmailAndPassword(email, password);
            await credencial.user.updateProfile({ displayName: usuario });
            claveUsuario = usuario.toLowerCase();
            const reserva = await db.ref(`nombresUsuario/${claveUsuario}`).transaction(actual =>
                actual === null ? credencial.user.uid : undefined
            );
            if (!reserva.committed) {
                await credencial.user.delete();
                salida.textContent = "Ese nombre de usuario ya está ocupado.";
                return;
            }
            await credencial.user.sendEmailVerification();
            await db.ref(`usuarios/${credencial.user.uid}`).set({
                usuario: claveUsuario,
                correo: email,
                creado: new Date().toISOString()
            });
            perfilActual = { usuario: claveUsuario, correo: email };
            renderCuentaPerfil();
            salida.textContent = `Cuenta creada. Tu ID de cliente es ${credencial.user.uid}. Verifica el correo para poder comprar.`;
            $("cuenta-password").value = "";
        } catch (error) {
            if (credencial?.user && claveUsuario) {
                const reservaRef = db.ref(`nombresUsuario/${claveUsuario}`);
                const reserva = await reservaRef.once("value");
                if (reserva.val() === credencial.user.uid) await reservaRef.remove();
                if (auth.currentUser?.uid === credencial.user.uid) await credencial.user.delete();
            }
            salida.textContent = describirErrorFirebase(error);
        }
        return;
    }
    try {
        await auth.signInWithEmailAndPassword(email, password);
$("cuenta-password").value = "";
$("cuenta-modal").style.display = "none";
aplicarModoPersonal(false);
    } catch (error) {
        salida.textContent = describirErrorFirebase(error);
    }
});
let productoSel   = null; // para modal de talla desde card

/* =============================================   PREVIEW IMÁGENES + PORTADA   */
let imagenesPreview = []; // {file, url, esPortada}
let portadaIndex = 0;

const inputImagen = $("imagen");
if (inputImagen) {
    inputImagen.addEventListener("change", () => {
        const archivos = Array.from(inputImagen.files);
        imagenesPreview = archivos.map((file, i) => ({
            file,
            url: URL.createObjectURL(file),
            esPortada: i === 0
        }));
        portadaIndex = 0;
        renderPreviewImagenes();
    });
}

function renderPreviewImagenes() {
    const cont = $("preview-imagenes");
    if (!cont) return;
    cont.innerHTML = "";
    if (!imagenesPreview.length) { cont.style.display = "none"; return; }
    cont.style.display = "grid";
    imagenesPreview.forEach((img, i) => {
        const div = document.createElement("div");
        div.className = "preview-img-item" + (i === portadaIndex ? " preview-img-portada" : "");
        div.innerHTML = `
            <img src="${img.url}" alt="preview">
            ${i === portadaIndex ? '<span class="preview-portada-badge">⭐ Portada</span>' : '<button class="preview-portada-btn">Hacer portada</button>'}
        `;
        if (i !== portadaIndex) {
            div.querySelector(".preview-portada-btn").addEventListener("click", () => {
                portadaIndex = i;
                renderPreviewImagenes();
            });
        }
        cont.appendChild(div);
    });
}

/* =============================================   CHECKBOXES TALLAS -> INPUT TEXTO   */
function sincronizarTallasCheckbox() {
    const checks = $$(".talla-check");
    const inputTallas = $("tallas");
    if (!checks.length || !inputTallas) return;
    checks.forEach(c => {
        c.addEventListener("change", () => {
            const seleccionadas = [...$$(".talla-check:checked")].map(x => x.value);
            if (seleccionadas.length) inputTallas.value = seleccionadas.join(",");
        });
    });
}
sincronizarTallasCheckbox();



/* =============================================   FIREBASE SYNC PRODUCTOS   */
if (typeof db !== "undefined") {
    db.ref("productos").on("value", (snapshot) => {
        const data = snapshot.val();
        if (data && Array.isArray(data) && data.length) {
            productos = data.filter(p => p); // por si Firebase deja huecos null
            localStorage.setItem("productos", JSON.stringify(productos));
            if (typeof renderProductos === "function") {
                renderProductos(productos); renderOfertas();
                if (typeof renderListaAdmin === "function" && esPersonal()) renderListaAdmin();
                if (typeof renderAdminStats === "function" && esPersonal()) renderAdminStats();
            }
        }
    }, error => {
        mostrarToast(`No se pudo cargar el catálogo: ${describirErrorFirebase(error)}`);
        console.error("Error al sincronizar el catálogo:",error);
    });
}

/* =============================================   SPLASH   */
window.addEventListener("load", () => {
    setTimeout(() => { const s=$("splash"); s.classList.add("splash-out"); setTimeout(()=>s.remove(),600); }, 2000);
    setTimeout(() => {
        $("skeleton-grid").style.display = "none";
        renderProductos(productos); renderOfertas(); renderResenas();
        initReveal(); iniciarNotifCompras();
        $("contador-favoritos").textContent = favoritos.length || "";
    }, 1800);
});

/* =============================================   HERO SLIDER   */
let heroIdx=0;
const slides=$$(".hero-slide"), dots=$$(".hero-dot");
function goSlide(n){slides[heroIdx].classList.remove("activo");dots[heroIdx].classList.remove("activo");heroIdx=(n+slides.length)%slides.length;slides[heroIdx].classList.add("activo");dots[heroIdx].classList.add("activo");}
$("hero-next").addEventListener("click",()=>goSlide(heroIdx+1));
$("hero-prev").addEventListener("click",()=>goSlide(heroIdx-1));
dots.forEach(d=>d.addEventListener("click",()=>goSlide(+d.dataset.idx)));
setInterval(()=>goSlide(heroIdx+1),5000);

/* =============================================   REVEAL   */
function initReveal(){
    const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("revealed");obs.unobserve(e.target);}});},{threshold:0.1});
    $$(".reveal").forEach(el=>obs.observe(el));
}

/* =============================================   SCROLL   */
window.addEventListener("scroll",()=>{
    $("navbar").classList.toggle("scrolled",window.scrollY>50);
    $("volver-arriba").classList.toggle("visible",window.scrollY>400);
});
$("volver-arriba").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
const destinosVista = {
    inicio: ["inicio"],
    ofertas: ["ofertas"],
    catalogo: ["catalogo-vista"],
    "catalogo-vista": ["catalogo-vista"],
    encargos: ["encargos"],
    nosotros: ["nosotros"],
    resenas: ["resenas"],
    entregas: ["entregas"],
    footer: ["contacto"],
    contacto: ["contacto"]
};
function ajustarVistaCompleta() {
}
$$('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
    const id=a.getAttribute("href").slice(1);
    const destino=document.getElementById(id);
    const objetivos=destinosVista[id];
    if(!destino||!objetivos)return;
    e.preventDefault();
    $$(".vista-activa").forEach(elemento=>elemento.classList.remove("vista-activa"));
    objetivos.forEach(objetivo=>$(objetivo).classList.add("vista-activa"));
    if(a.dataset.categoriaTienda){
        const categoria=a.dataset.categoriaTienda;
        const checks=[...$$(".filtro-check")];
        checks.forEach(check=>check.checked=categoria!=="todos"&&check.value===categoria);
        pMin.value="0";
        pMax.value="1000";
        rVal.textContent="0 – 1000 Bs";
        $("ordenar").value="";
        buscador.value="";
        resultados.style.display="none";
        checks[0]?.dispatchEvent(new Event("change",{bubbles:true}));
    }
    document.body.classList.add("vista-seccion");
    document.body.dataset.vista=objetivos[0];
    history.replaceState(null,"",`#${id}`);
    window.scrollTo({top:0,behavior:"auto"});
    requestAnimationFrame(()=>requestAnimationFrame(ajustarVistaCompleta));
}));
window.addEventListener("resize",ajustarVistaCompleta);

/* =============================================   BUSCADOR   */
const buscador=$("buscador"), resultados=$("buscador-resultados");
buscador.addEventListener("input",()=>{
    const txt=buscador.value.trim().toLowerCase();
    if(!txt){resultados.style.display="none";renderProductos(productos);return;}
    const found=productos.filter(p=>p.nombre.toLowerCase().includes(txt));
    renderProductos(found);
    const top5=found.slice(0,5);
    if(!top5.length){resultados.style.display="none";return;}
    resultados.innerHTML=top5.map(p=>`<div class="res-item" data-id="${p.id}"><img src="${p.imagenes[0]}" alt="${p.nombre}"><div><p>${p.nombre}</p><span>${p.precio} Bs</span></div></div>`).join("");
    resultados.style.display="block";
    $$(".res-item").forEach(el=>el.addEventListener("click",()=>{const p=productos.find(x=>x.id===+el.dataset.id);if(p){abrirDetalle(p);resultados.style.display="none";buscador.value="";}}));
});
document.addEventListener("click",e=>{if(!e.target.closest(".buscador-wrap"))resultados.style.display="none";});

/* =============================================   CARRITO   */
document.querySelector(".carrito-icono").addEventListener("click",()=>{
    $("carrito-panel").style.display=$("carrito-panel").style.display==="block"?"none":"block";
});
$("cerrar-carrito").addEventListener("click",()=>{$("carrito-panel").style.display="none";});

/* =============================================   CUPONES   */
$("aplicar-cupon").addEventListener("click",()=>{
    const codigo=$("cupon-input").value.trim().toUpperCase();
    const cupon=cupones.find(c=>c.codigo===codigo);
    if(!cupon){mostrarToast("❌ Cupón no válido");return;}
    cuponAplicado=cupon;
    $("descuento-aviso").style.display="block";
    $("descuento-aviso").textContent=`✅ Cupón "${cupon.codigo}" — ${cupon.descuento}% off`;
    actualizarCarrito(true);
    mostrarToast(`🎉 ${cupon.descuento}% de descuento aplicado`);
});

/* =============================================   RANGO PRECIO   */
const pMin=$("precio-min"), pMax=$("precio-max"), rVal=$("rango-valor");
function aplicarRango(){
    let min=+pMin.value, max=+pMax.value;
    if(min>max){[min,max]=[max,min];}
    rVal.textContent=`${min} – ${max} Bs`;
    const activos=[...$$(".filtro-check:checked")].map(x=>x.value);
    let lista=productos.filter(p=>+p.precio>=min&&+p.precio<=max);
    if(activos.length) lista=lista.filter(p=>activos.includes(p.categoria));
    renderProductos(lista);
}
pMin.addEventListener("input",aplicarRango);
pMax.addEventListener("input",aplicarRango);

/* =============================================   FILTROS / ORDENAR   */
$("ordenar").addEventListener("change",()=>{
    let lista=[...productos];const v=$("ordenar").value;
    if(v==="menor") lista.sort((a,b)=>+a.precio - +b.precio);
    if(v==="mayor") lista.sort((a,b)=>+b.precio - +a.precio);
    if(v==="oferta") lista=lista.filter(p=>p.esOferta);
    if(v==="vendidos") lista.sort((a,b)=>(+b.vendidos||0)-(+a.vendidos||0));
    if(v==="agotado") lista=lista.filter(p=>!p.agotado);
    renderProductos(lista);
});

const bannerCats={
    clubes:{titulo:"⚽ Clubes",desc:"Los mejores jerseys de los equipos más grandes del mundo",color:"#7b7b7b"},
    retro:{titulo:"🕹 Retro",desc:"Clásicos que nunca pasan de moda",color:"#717171"},
    selecciones:{titulo:"🌍 Selecciones",desc:"Representa a tu país con estilo",color:"#686868"},
    player:{titulo:"⭐ Player Version",desc:"La misma calidad que usan los profesionales",color:"#a6a6a6"}
};

$$(".filtro-check").forEach(c=>c.addEventListener("change",()=>{
    const activos=[...$$(".filtro-check:checked")].map(x=>x.value);
    const banner=$("banner-categoria"),bannerContent=$("banner-cat-content");
    if(activos.length===1){
        const cat=bannerCats[activos[0]];
        bannerContent.innerHTML=`<h3>${cat.titulo}</h3><p>${cat.desc}</p>`;
        banner.style.borderColor=cat.color;banner.style.display="block";
    }else banner.style.display="none";
    let lista=activos.length?productos.filter(p=>activos.includes(p.categoria)):productos;
    const min=+pMin.value,max=+pMax.value;
    lista=lista.filter(p=>+p.precio>=min&&+p.precio<=max);
    renderProductos(lista);
}));

/* =============================================   ADMIN TABS   */
function activarTabAdmin(btn) {
    if ((btn.dataset.roles || "admin").split(" ").indexOf(rolActual) === -1) return;
    $$(".atab").forEach(b=>b.classList.remove("activo"));
    $$(".atab").forEach(b=>b.setAttribute("aria-selected","false"));
    $$(".admin-tab-content").forEach(t=>t.classList.remove("activo"));
    btn.classList.add("activo");
    btn.setAttribute("aria-selected","true");
    $("tab-"+btn.dataset.tab).classList.add("activo");
    if(btn.dataset.tab==="editar") renderListaAdmin();
    if(btn.dataset.tab==="clientes") renderAdminClientes();
    if(btn.dataset.tab==="caja") renderCaja();
    if(btn.dataset.tab==="encargos-admin") renderAdminEncargos();
    if(btn.dataset.tab==="cupones") renderListaCupones();
    if(btn.dataset.tab==="resenas-admin") renderResenasPendientes();
}
$$(".atab").forEach(btn=>btn.addEventListener("click",()=>activarTabAdmin(btn)));
$("admin-actualizar").addEventListener("click",()=>{
    if(esPersonal()) renderAdminStats();
    const pestanaActiva=document.querySelector(".atab.activo")?.dataset.tab;
    if(pestanaActiva==="editar") renderListaAdmin();
    if(pestanaActiva==="clientes") renderAdminClientes();
    if(pestanaActiva==="caja") renderCaja();
    if(pestanaActiva==="encargos-admin") renderAdminEncargos();
    if(pestanaActiva==="cupones") renderListaCupones();
    if(pestanaActiva==="resenas-admin") renderResenasPendientes();
    if(pestanaActiva==="equipo" && !adminLogueado) return;
    mostrarToast("Panel actualizado");
});
$("equipo-form").addEventListener("submit", async event => {
    event.preventDefault();
    const estado = $("equipo-estado");
    const boton = $("equipo-crear");
    if (!adminLogueado || !usuarioActual) {
        estado.textContent = "Solo el administrador puede crear cuentas del equipo.";
        return;
    }

    estado.textContent = "Creando cuenta…";
    boton.disabled = true;
    try {
        const token = await usuarioActual.getIdToken();
        const response = await fetch("/api/create-staff", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: $("equipo-email").value.trim(),
                password: $("equipo-password").value,
                role: $("equipo-rol").value
            })
        });
        let result;
        try {
            result = await response.json();
        } catch (error) {
            throw new Error("La función de cuentas de Vercel todavía no está disponible.");
        }
        if (!response.ok) throw new Error(result.error || "No se pudo crear la cuenta.");
        estado.textContent = `Cuenta ${etiquetaRol(result.role)} creada para ${result.email}. UID: ${result.uid}`;
        $("equipo-form").reset();
    } catch (error) {
        estado.textContent = error.message || "No se pudo crear la cuenta. Inténtalo nuevamente.";
        console.error("Error al crear cuenta del equipo:", error);
    } finally {
        boton.disabled = false;
    }
});
$("caja-fondo-inicial").addEventListener("input", actualizarVistaCierreCaja);
$("caja-efectivo-contado").addEventListener("input", actualizarVistaCierreCaja);
$("caja-cerrar-dia").addEventListener("click", registrarCierreCaja);
$("admin-ver-tienda").addEventListener("click",()=>{
    document.querySelector('nav .nav-links a[href="#inicio"]')?.click();
});
$("admin-ver-inventario").addEventListener("click",()=>{
    const boton=document.querySelector('.admin-tabs .atab[data-tab="editar"]');
    if(boton&&!boton.hidden) activarTabAdmin(boton);
});
$("inventario-buscar").addEventListener("input", renderListaAdmin);
$("inventario-filtro-stock").addEventListener("change", renderListaAdmin);
$("pedidos-filtro-estado").addEventListener("change", aplicarFiltroPedidosAdmin);
$("recargar-clientes").addEventListener("click", renderAdminClientes);
$("recargar-encargos").addEventListener("click", renderAdminEncargos);
$("es-oferta").addEventListener("change",()=>{$("campo-precio-original").style.display=$("es-oferta").checked?"block":"none";});
$("edit-es-oferta").addEventListener("change",()=>{$("edit-campo-oferta").style.display=$("edit-es-oferta").checked?"block":"none";});

/* =============================================   AGREGAR PRODUCTO   */
async function agregarProducto(){
    if (!adminLogueado && rolActual !== "empleado") {
        mostrarToast("Tu rol no puede agregar productos.");
        return;
    }
    const archivos=$("imagen").files;
    const imgUrl  =$("img-url").value.trim();
    const nombre  =$("nombre").value.trim();
    const tallas  =$("tallas").value.trim();
    const dorsales=$("dorsales").value.trim();
    const calidad =$("calidad").value.trim();
    const colores =$("colores").value.trim();
    const desc    =$("descripcion").value.trim();
    const cat     =$("categoria").value;
    const precio  =$("precio").value;
    const vendidos=$("vendidos").value;
    const esOferta=$("es-oferta").checked;
    const precioO =$("precio-original").value;
    const finOf   =$("fin-oferta").value;
    const stock   =$("stock").value;
    if(!nombre||!precio){alert("Completa nombre y precio");return;}
    if(!Number.isFinite(Number(precio))||Number(precio)<=0){alert("Ingresa un precio válido.");return;}
    if(archivos.length+(imgUrl?1:0)>10){alert("Agrega un máximo de 10 imágenes por producto.");return;}
    if(esOferta&&!precioO){alert("Ingresa el precio original");return;}
    if(!tallas){alert("Selecciona al menos una talla");return;}
    if(rolActual==="empleado"&&stock!==""&&(!Number.isInteger(Number(stock))||Number(stock)<0||Number(stock)>10000)){
        alert("El stock debe ser un número entero entre 0 y 10.000.");
        return;
    }
    let imagenes=[];
    if(imgUrl) imagenes=[imgUrl];
    if(archivos.length>0){
        mostrarToast("⏳ Subiendo archivos...");
        // Reordenar archivos: la portada elegida va primero
        const ordenSubida=[...archivos];
        if(imagenesPreview.length===archivos.length && portadaIndex>0){
            const port=ordenSubida.splice(portadaIndex,1)[0];
            ordenSubida.unshift(port);
        }
        for(let i=0;i<ordenSubida.length;i++){
            const fd=new FormData();fd.append("file",ordenSubida[i]);fd.append("upload_preset","futbol-premier");
            const endpoint=ordenSubida[i].type.startsWith("video")?"https://api.cloudinary.com/v1_1/dxcfq1mln/video/upload":"https://api.cloudinary.com/v1_1/dxcfq1mln/image/upload";
            try{const r=await fetch(endpoint,{method:"POST",body:fd});imagenes.push((await r.json()).secure_url);}
            catch(e){alert("Error subiendo archivos");return;}
        }
    }
    if(!imagenes.length){alert("Agrega al menos una imagen o URL");return;}
    const nuevoProducto={id:Date.now(),imagenes,nombre,tallas,dorsales,calidad,colores,descripcion:desc,categoria:cat,precio:adminLogueado?precio:Number(precio),vendidos:+vendidos||0,esOferta,precioOriginal:esOferta?precioO:null,finOferta:esOferta&&finOf?finOf:null,stock:stock||null,agotado:false,visitas:0};
    if (rolActual === "empleado") {
        const productoEmpleado = {
            id: nuevoProducto.id,
            imagenes: nuevoProducto.imagenes,
            nombre: nuevoProducto.nombre,
            tallas: nuevoProducto.tallas,
            dorsales: nuevoProducto.dorsales,
            calidad: nuevoProducto.calidad,
            colores: nuevoProducto.colores,
            descripcion: nuevoProducto.descripcion,
            categoria: nuevoProducto.categoria,
            precio: Number(precio),
            ...(stock === "" ? {} : { stock: Number(stock) }),
            agotado: stock !== "" && Number(stock) === 0
        };
        try {
            let guardado = false;
            for (let intento = 0; intento < 3 && !guardado; intento++) {
                const snapshot = await db.ref("productos").once("value");
                const existentes = snapshot.val();
                if (!Array.isArray(existentes)) {
                    throw new Error("El catálogo todavía no está inicializado en Firebase.");
                }
                const hueco = existentes.findIndex(producto => !producto);
                const indice = hueco >= 0 ? hueco : existentes.length;
                const resultado = await db.ref(`productos/${indice}`).transaction(
                    actual => actual === null ? productoEmpleado : undefined,
                    null,
                    false
                );
                guardado = resultado.committed;
            }
            if (!guardado) throw new Error("El catálogo cambió mientras guardabas. Inténtalo otra vez.");
        } catch (error) {
            mostrarToast(`No se pudo agregar el producto: ${describirErrorFirebase(error)}`);
            console.error("Error al agregar producto como empleado:", error);
            return;
        }
        productos.push(productoEmpleado);
        localStorage.setItem("productos", JSON.stringify(productos));
    } else {
        productos.push(nuevoProducto);
        guardarLS();
    }
    renderProductos(productos);renderOfertas();renderAdminStats();limpiarFormulario();
    imagenesPreview=[];portadaIndex=0;
    const previewCont=$("preview-imagenes");if(previewCont){previewCont.innerHTML="";previewCont.style.display="none";}
    $$(".talla-check").forEach(c=>c.checked=false);
    mostrarToast("✅ Jersey agregado");
}

/* =============================================   RENDER   */
function renderProductos(lista){
    marcarMasVendido();
    const cat=$("catalogo");cat.innerHTML="";
    if(!lista.length){cat.innerHTML=`<p class="sin-productos">No se encontraron jerseys 😔</p>`;return;}
    lista.forEach(p=>crearCard(p,cat));initReveal();
}
function renderOfertas(){
    const co=$("catalogo-ofertas");co.innerHTML="";
    const lista=productos.filter(p=>p.esOferta);
    if(!lista.length){$("sin-ofertas").style.display="block";co.style.display="none";}
    else{
        $("sin-ofertas").style.display="none";
        co.style.display="grid";
        lista.forEach(p=>crearCard(p,co));
        initReveal();
    }
}

/* =============================================   CREAR CARD   */
const badgeColor={clubes:"#7b7b7b",retro:"#717171",selecciones:"#686868",player:"#a6a6a6"};

function crearCard(producto,cont){
    let idx=0;
    const isFav=favoritos.includes(producto.id);
    const isComp=compararLista.some(x=>x.id===producto.id);
    const stockNum=parseInt(producto.stock);
    let stockHTML="";
    if(producto.agotado) stockHTML=`<p class="stock-agotado">AGOTADO</p>`;
    else if(producto.stock&&stockNum<=4) stockHTML=`<p class="stock-bajo">POCAS UNIDADES: ${stockNum}</p>`;
    else if(producto.stock) stockHTML=`<p class="stock-info">${producto.stock} disponibles</p>`;

    const vendidosHTML=producto.vendidos&&producto.vendidos>0?`<p class="vendidos-badge">${producto.vendidos} vendidos</p>`:"";
    const cuotasHTML=+producto.precio>100?`<p class="cuotas-badge">o 3 cuotas de ${Math.ceil(+producto.precio/3)} Bs</p>`:"";
    const precioHTML=producto.esOferta&&producto.precioOriginal
        ?`<div class="precio-oferta"><span class="precio-antes">${producto.precioOriginal} Bs</span><span class="precio-ahora">${producto.precio} Bs</span><span class="ahorro-badge">Ahorras ${+producto.precioOriginal - +producto.precio} Bs</span></div>`
        :`<p class="precio">${producto.precio} Bs</p>`;

    const thumbsHTML=producto.imagenes.map((src,i)=>{
        const isVideo=src.includes("cloudinary")&&(src.endsWith(".mp4")||src.endsWith(".webm")||src.includes("/video/"));
        return `<img src="${isVideo?src.replace(/\.(mp4|webm)/,'.jpg').replace('/video/','/image/'):src}" class="thumb ${i===0?'active':''}" data-index="${i}">`;
    }).join("");

    const card=document.createElement("div");
    card.className="card reveal"+(producto.esOferta?" card-oferta":"")+(producto.agotado?" card-agotado":"")+(isComp?" card-comparando":"");
    card.innerHTML=`
        <div class="slider">
            <img src="${producto.imagenes[0]}" class="slider-img">
            <button class="prev">❮</button><button class="next">❯</button>
            <div class="badges-slider">
                ${producto.esOferta?'<span class="badge-oferta">OFERTA</span>':""}
                ${producto.agotado?'<span class="badge-agotado">AGOTADO</span>':""}
                <span class="badge-cat" style="background:${badgeColor[producto.categoria]||'#333333'}">${producto.categoria.toUpperCase()}</span>
            </div>
            <button class="btn-fav-card ${isFav?'fav-activo':''}" data-id="${producto.id}" aria-label="${isFav?'Quitar de favoritos':'Agregar a favoritos'}">${isFav?'♥':'♡'}</button>
        </div>
        <div class="miniaturas">${thumbsHTML}</div>
        <div class="info">
            <h3>${producto.nombre}</h3>
            <p><strong>Tallas:</strong> ${producto.tallas}</p>
            <p><strong>Calidad:</strong> ${producto.calidad}</p>
            ${vendidosHTML}${stockHTML}${precioHTML}${cuotasHTML}
            <div class="botones-card">
                <button class="btn-ver-detalle">Ver detalle</button>
                <button class="agregar-carrito" ${producto.agotado?"disabled":""}>${producto.agotado?"Agotado":"Agregar"}</button>
                <div class="card-extra-btns">
                    <button class="btn-wsp-rapido" data-nombre="${producto.nombre}" data-precio="${producto.precio}">Consultar</button>
                    <button class="btn-comparar-card ${isComp?'comp-activo':''}" data-id="${producto.id}">⚖️ ${isComp?'Quitando...':'Comparar'}</button>
                    ${adminLogueado?`<button class="btn-editar-card">✏️</button><button class="btn-agotado-card">${producto.agotado?"↩️":"❌"}</button><button class="eliminar">🗑</button>`:""}
                </div>
            </div>
        </div>`;

    const sImg=card.querySelector(".slider-img");
    const thumbs=card.querySelectorAll(".thumb");
    function syncSlider(){sImg.src=producto.imagenes[idx];thumbs.forEach((t,i)=>t.classList.toggle("active",i===idx));}
    card.querySelector(".prev").addEventListener("click",()=>{idx=(idx-1+producto.imagenes.length)%producto.imagenes.length;syncSlider();});
    card.querySelector(".next").addEventListener("click",()=>{idx=(idx+1)%producto.imagenes.length;syncSlider();});
    thumbs.forEach(t=>t.addEventListener("click",()=>{idx=+t.dataset.index;syncSlider();}));
    sImg.addEventListener("click",()=>abrirGaleria(producto.imagenes,idx));

    card.querySelector(".btn-ver-detalle").addEventListener("click",()=>{
        producto.visitas=(producto.visitas||0)+1;guardarLS();abrirDetalle(producto);
    });

    card.querySelector(".btn-fav-card").addEventListener("click",e=>{
        e.stopPropagation();toggleFavorito(producto.id);
        const btn=card.querySelector(".btn-fav-card");
        const now=favoritos.includes(producto.id);
        btn.textContent=now?"♥":"♡";btn.classList.toggle("fav-activo",now);
    });

    // AGREGAR — abre modal de talla
    const btnAg=card.querySelector(".agregar-carrito");
    if(!producto.agotado){
        btnAg.addEventListener("click",()=>abrirTallaSelector(producto));
    }

    // WhatsApp rápido
    card.querySelector(".btn-wsp-rapido").addEventListener("click",e=>{
        e.stopPropagation();
        const nombre=e.currentTarget.dataset.nombre;
        const precio=e.currentTarget.dataset.precio;
        const msg=`Hola, me interesa el jersey: *${nombre}* — ${precio} Bs. ¿Tienen disponibilidad?`;
        window.open(`https://wa.me/59171208827?text=${encodeURIComponent(msg)}`,"_blank");
    });

    // COMPARAR
    card.querySelector(".btn-comparar-card").addEventListener("click",e=>{
        e.stopPropagation();
        const yaEsta=compararLista.some(x=>x.id===producto.id);
        if(yaEsta){compararLista=compararLista.filter(x=>x.id!==producto.id);}
        else{if(compararLista.length>=2){mostrarToast("Solo puedes comparar 2 jerseys");return;}compararLista.push(producto);}
        renderProductos(productos);actualizarBarraComparar();
    });

    if(adminLogueado){
        card.querySelector(".btn-editar-card").addEventListener("click",()=>abrirEditar(producto));
        card.querySelector(".btn-agotado-card").addEventListener("click",()=>{producto.agotado=!producto.agotado;guardarLS();renderProductos(productos);renderOfertas();mostrarToast(producto.agotado?"❌ Agotado":"✅ Repuesto");});
        card.querySelector(".eliminar").addEventListener("click",()=>{if(confirm(`¿Eliminar "${producto.nombre}"?`)){productos=productos.filter(p=>p.id!==producto.id);guardarLS();renderProductos(productos);renderOfertas();renderAdminStats();mostrarToast("🗑 Eliminado");}});
    }
    cont.appendChild(card);
}

/* =============================================   MODAL SELECTOR TALLA (DESDE CARD)   */
function abrirTallaSelector(producto){
    productoSel = producto;
    let tallaS = null, dorsalS = null, colorS = null;

    const modal = $("talla-selector-modal");

    // Imagen y nombre
    const img = $("talla-sel-img");
    if(img) img.src = producto.imagenes[0];
    $("talla-sel-nombre").textContent = producto.nombre;

    // Precio
    $("talla-sel-precio").innerHTML = producto.esOferta && producto.precioOriginal
        ? `<span style="color:var(--text3);text-decoration:line-through;font-size:.9rem;">${producto.precioOriginal} Bs</span>
           <span style="color:#6c6c6c;font-size:1.2rem;font-weight:bold;margin-left:6px;">${producto.precio} Bs</span>`
        : `<span style="font-size:1.2rem;font-weight:bold;">${producto.precio} Bs</span>`;

    // Visores
    const vEl = $("talla-sel-visores");
    if(vEl){ const v=Math.floor(Math.random()*8)+2; vEl.innerHTML=`<span style="display:inline-block;background:rgba(192, 192, 192, .1);border:1px solid rgba(192, 192, 192, .3);color:var(--accent);padding:2px 9px;border-radius:18px;font-size:.72rem;margin-top:4px;">👁 ${v} personas viendo</span>`; }

    // ---- TALLAS ----
    const ta = producto.tallas ? producto.tallas.split(",").map(s=>s.trim()).filter(Boolean) : ["Única"];
    const tb = $("talla-sel-btns");
    tb.innerHTML = "";
    tallaS = ta.length === 1 ? ta[0] : null;
    $("talla-sel-error").style.display = "none";

    ta.forEach(t => {
        const b = document.createElement("button");
        b.textContent = t;
        b.style.cssText = "padding:9px 16px;border:1px solid var(--border);border-radius:9px;background:var(--bg3);color:var(--text);cursor:pointer;font-weight:600;font-size:.86rem;transition:.2s;";
        if(ta.length === 1){ b.style.borderColor="var(--accent)"; b.style.background="var(--accent)"; b.style.color="#000000"; }
        b.addEventListener("mouseenter", ()=>{ if(tallaS!==t){ b.style.borderColor="var(--accent)"; } });
        b.addEventListener("mouseleave", ()=>{ if(tallaS!==t){ b.style.borderColor="var(--border)"; b.style.background="var(--bg3)"; b.style.color="var(--text)"; } });
        b.addEventListener("click", () => {
            tallaS = t;
            tb.querySelectorAll("button").forEach(x=>{ x.style.borderColor="var(--border)"; x.style.background="var(--bg3)"; x.style.color="var(--text)"; });
            b.style.borderColor = "var(--accent)"; b.style.background = "var(--accent)"; b.style.color = "#000000";
            $("talla-sel-error").style.display = "none";
        });
        tb.appendChild(b);
    });

    // ---- DORSALES ----
    const da = producto.dorsales ? producto.dorsales.split(",").map(s=>s.trim()).filter(Boolean) : ["—"];
    const db = $("dorsal-sel-btns");
    db.innerHTML = "";
    dorsalS = da.length === 1 ? da[0] : null;
    $("dorsal-sel-error").style.display = "none";

    da.forEach(d => {
        const b = document.createElement("button");
        b.textContent = d;
        b.style.cssText = "padding:9px 16px;border:1px solid var(--border);border-radius:9px;background:var(--bg3);color:var(--text);cursor:pointer;font-weight:600;font-size:.86rem;transition:.2s;";
        if(da.length === 1){ b.style.borderColor="var(--accent)"; b.style.background="var(--accent)"; b.style.color="#000000"; }
        b.addEventListener("click", () => {
            dorsalS = d;
            db.querySelectorAll("button").forEach(x=>{ x.style.borderColor="var(--border)"; x.style.background="var(--bg3)"; x.style.color="var(--text)"; });
            b.style.borderColor = "var(--accent)"; b.style.background = "var(--accent)"; b.style.color = "#000000";
            $("dorsal-sel-error").style.display = "none";
        });
        db.appendChild(b);
    });

    // ---- COLORES ----
    const cw = $("color-sel-wrap"), cb = $("color-sel-btns");
    if(producto.colores){
        const ca = producto.colores.split(",").map(s=>s.trim()).filter(Boolean);
        cb.innerHTML = ""; colorS = ca.length===1 ? ca[0] : null;
        ca.forEach(c => {
            const b = document.createElement("button");
            b.textContent = c;
            b.style.cssText = "padding:9px 16px;border:1px solid var(--border);border-radius:9px;background:var(--bg3);color:var(--text);cursor:pointer;font-weight:600;font-size:.86rem;transition:.2s;";
            if(ca.length===1){ b.style.borderColor="var(--accent)"; b.style.background="var(--accent)"; b.style.color="#000000"; }
            b.addEventListener("click",()=>{
                colorS=c;
                cb.querySelectorAll("button").forEach(x=>{ x.style.borderColor="var(--border)"; x.style.background="var(--bg3)"; x.style.color="var(--text)"; });
                b.style.borderColor="var(--accent)"; b.style.background="var(--accent)"; b.style.color="#000000";
            });
            cb.appendChild(b);
        });
        cw.style.display = "block";
    } else { cw.style.display = "none"; }

    // ---- STOCK ----
    const sn = parseInt(producto.stock); const sa = $("talla-sel-stock");
    if(producto.agotado){ sa.style.display="block"; sa.textContent="❌ Producto agotado"; }
    else if(producto.stock && sn<=4){ sa.style.display="block"; sa.textContent=`⚠️ ¡Solo quedan ${sn} unidades!`; }
    else sa.style.display = "none";

    // ---- VALIDAR ----
    function validar(){
        let ok = true;
        if(!tallaS){
            $("talla-sel-error").style.display = "block";
            tb.style.animation = "shake .4s ease";
            setTimeout(()=>tb.style.animation="", 500);
            ok = false;
        }
        if(!dorsalS){
            $("dorsal-sel-error").style.display = "block";
            db.style.animation = "shake .4s ease";
            setTimeout(()=>db.style.animation="", 500);
            ok = false;
        }
        if(!ok) mostrarToast("👆 Selecciona talla y dorsal");
        return ok;
    }

    // ---- BOTONES ----
    $("talla-sel-agregar").onclick = () => {
        if(!validar()) return;
        agregarAlCarrito(producto, tallaS, dorsalS, colorS||"");
        cerrarTallaModal();
    };

    $("talla-sel-comprar-ya").onclick = () => {
        if(!validar()) return;
        agregarAlCarrito(producto, tallaS, dorsalS, colorS||"");
        cerrarTallaModal();
        setTimeout(()=>{
            let subtotal=0; carrito.forEach(i=>subtotal+=+i.precio*i.cantidad);
            const desc=cuponAplicado?Math.round(subtotal*cuponAplicado.descuento/100):0;
            $("total-pago").textContent = subtotal-desc;
            const pr=$("pago-resumen");
            pr.innerHTML=`<h4>📋 Tu pedido:</h4>`+carrito.map(item=>`
                <div class="pago-item">
                    <span>${item.nombre} x${item.cantidad}</span>
                    <div class="pago-item-detalle">
                        <span class="pago-talla-badge">Talla: ${item.talla}</span>
                        ${item.dorsal&&item.dorsal!=="—"?`<span class="pago-talla-badge">Dorsal: ${item.dorsal}</span>`:""}
                        ${item.color?`<span class="pago-talla-badge">${item.color}</span>`:""}
                    </div>
                    <span>${+item.precio*item.cantidad} Bs</span>
                </div>`).join("");
            $("pago-modal").style.display = "flex";
        }, 300);
    };

    $("talla-sel-wsp").onclick = () => {
        const msg=`Hola, me interesa: *${producto.nombre}* — ${producto.precio} Bs. ¿Tienen disponibilidad?`;
        window.open(`https://wa.me/59171208827?text=${encodeURIComponent(msg)}`,"_blank");
    };

    // Abrir modal usando display flex
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function cerrarTallaModal(){
    $("talla-selector-modal").style.display = "none";
    document.body.style.overflow = "";
}

$("talla-sel-cerrar").addEventListener("click", cerrarTallaModal);
$("talla-selector-modal").addEventListener("click", e=>{ if(e.target===$("talla-selector-modal")) cerrarTallaModal(); });
$("btn-guia-tallas2").addEventListener("click", ()=>$("talla-guia-modal").classList.add("activo"));



/* =============================================   AGREGAR AL CARRITO   */
function agregarAlCarrito(producto,talla,dorsal,color){
    const key=`${producto.id}-${talla}-${dorsal}-${color}`;
    const ex=carrito.find(i=>i.key===key);
    ex?ex.cantidad++:carrito.push({key,id:producto.id,nombre:producto.nombre,precio:producto.precio,talla,dorsal,color,cantidad:1});
    document.querySelector(".carrito-icono").classList.add("bounce");
    setTimeout(()=>document.querySelector(".carrito-icono").classList.remove("bounce"),400);
    actualizarCarrito();
    mostrarToast(`✅ ${producto.nombre} (${talla}${color?" · "+color:""}) agregado`);
    $("carrito-panel").style.display="block";
}

/* =============================================   ACTUALIZAR CARRITO   */
function actualizarCarrito(animar){
    const ic=$("items-carrito");ic.innerHTML="";
    let subtotal=0,cantTotal=0;
    carrito.forEach((item,i)=>{
        subtotal+=+item.precio*item.cantidad;cantTotal+=item.cantidad;
        const d=document.createElement("div");d.className="item-carrito";
        d.innerHTML=`<div class="item-top"><h4>${item.nombre}</h4><button class="eliminar-item" data-index="${i}">✕</button></div>
            <p class="item-detalles">Talla: <strong>${item.talla}</strong>${item.dorsal&&item.dorsal!=="—"?" · Dorsal: <strong>"+item.dorsal+"</strong>":""}${item.color?" · Color: <strong>"+item.color+"</strong>":""}</p>
            <p class="item-precio">${item.precio} Bs c/u</p>
            <div class="cantidad-control"><button class="menos" data-index="${i}">−</button><span>${item.cantidad}</span><button class="mas" data-index="${i}">+</button></div>`;
        ic.appendChild(d);
    });
    const desc=cuponAplicado?Math.round(subtotal*cuponAplicado.descuento/100):0;
    const total=subtotal-desc;
    $("subtotal").textContent=subtotal;
    // Animación precio
    if(animar){animarPrecio($("total"),+$("total").textContent,total);}
    else $("total").textContent=total;
    $("contador-carrito").textContent=cantTotal;
    const ld=$("linea-descuento");
    if(cuponAplicado&&desc>0){ld.style.display="block";$("descuento-monto").textContent=desc;}else ld.style.display="none";
    $$(".mas").forEach(b=>b.addEventListener("click",()=>{carrito[+b.dataset.index].cantidad++;actualizarCarrito();}));
    actualizarBarraEnvio();
    if(carrito.length>0) iniciarTimerCarrito();
    $$(".menos").forEach(b=>b.addEventListener("click",()=>{const i=+b.dataset.index;carrito[i].cantidad>1?carrito[i].cantidad--:carrito.splice(i,1);actualizarCarrito();}));
    $$(".eliminar-item").forEach(b=>b.addEventListener("click",()=>{carrito.splice(+b.dataset.index,1);actualizarCarrito();}));
}

/* =============================================   ANIMACIÓN PRECIO   */
function animarPrecio(el,desde,hasta){
    const steps=20,dur=600,inc=(hasta-desde)/steps;
    let v=desde,s=0;
    const t=setInterval(()=>{v+=inc;s++;el.textContent=Math.round(v);if(s>=steps){el.textContent=hasta;clearInterval(t);}},dur/steps);
}

/* =============================================   FINALIZAR COMPRA   */
$("finalizar-compra").addEventListener("click",async ()=>{
    if(!carrito.length){alert("El carrito está vacío");return;}
    if(!usuarioActual){
        mostrarCuenta("ingresar");
        mostrarToast("Inicia sesión o crea una cuenta para guardar tus pedidos.");
        return;
    }
    if(usuarioActual.uid !== ADMIN_UID){
        await usuarioActual.reload();
        usuarioActual = auth.currentUser;
        await usuarioActual.getIdToken(true);
        if(!usuarioActual.emailVerified){
            mostrarCuenta("ingresar");
            $("cuenta-mensaje").textContent = "Verifica tu correo antes de confirmar un pedido.";
            renderCuentaPerfil();
            mostrarToast("Verifica tu correo electrónico para continuar.");
            return;
        }
    }
    let subtotal=0;carrito.forEach(i=>subtotal+=+i.precio*i.cantidad);
    const desc=cuponAplicado?Math.round(subtotal*cuponAplicado.descuento/100):0;
    $("total-pago").textContent=subtotal-desc;
    // Resumen con tallas en modal pago
    const pr=$("pago-resumen");
    pr.innerHTML=`<h4>📋 Resumen de tu pedido:</h4>`+carrito.map(item=>`
        <div class="pago-item">
            <span>${item.nombre} x${item.cantidad}</span>
            <div class="pago-item-detalle">
                <span class="pago-talla-badge">Talla: ${item.talla}</span>
                ${item.dorsal&&item.dorsal!=="—"?`<span class="pago-talla-badge">Dorsal: ${item.dorsal}</span>`:""}
                ${item.color?`<span class="pago-talla-badge">${item.color}</span>`:""}
            </div>
            <span>${+item.precio*item.cantidad} Bs</span>
        </div>`).join("");
    $("pago-modal").style.display="flex";$("carrito-panel").style.display="none";
});
$("cerrar-pago").addEventListener("click",()=>$("pago-modal").style.display="none");


/* =============================================   SELECTOR ENVÍO EN PAGO   */
let tipoEnvioSeleccionado = "";
let puntoEnvioSeleccionado = "";

$$('input[name="tipo-envio"]').forEach(radio => {
    radio.addEventListener("change", () => {
        tipoEnvioSeleccionado = radio.value;
        // Ocultar todos los detalles
        ["lapaz","elalto","nacional","delivery"].forEach(id => {
            const el = $("detalle-"+id);
            if(el) el.style.display = "none";
        });
        // Mostrar el seleccionado
        const detalle = $("detalle-"+radio.value);
        if(detalle) detalle.style.display = "block";
        puntoEnvioSeleccionado = "";

        // Actualizar badge de costo
        const badge = $("costo-envio-badge");
        if(badge){
            if(radio.value==="lapaz"||radio.value==="elalto"){
                badge.textContent="+ 10-15 Bs delivery";badge.style.display="inline";
            }else if(radio.value==="nacional"){
                badge.textContent="+ envío según ciudad";badge.style.display="inline";
            }else if(radio.value==="delivery"){
                badge.textContent="+ 10-15 Bs delivery";badge.style.display="inline";
            }
        }
        // Resaltar opción seleccionada
        $$(".envio-opcion").forEach(op=>op.classList.remove("envio-opcion-activo"));
        radio.closest(".envio-opcion").classList.add("envio-opcion-activo");
    });
});

// Capturar punto seleccionado
["punto-lapaz","punto-elalto","ciudad-nacional"].forEach(id => {
    const el = $(id);
    if(el) el.addEventListener("change", () => { puntoEnvioSeleccionado = el.value; });
});


/* =============================================   WHATSAPP   */
$("enviar-whatsapp").addEventListener("click",async ()=>{
    const num=Math.floor(1000+Math.random()*9000);
    // Validar que eligió tipo de envío
    if(!tipoEnvioSeleccionado){
        mostrarToast("⚠️ Elige cómo quieres recibir tu pedido");
        return;
    }
    const etiquetasEnvio={lapaz:"🏙️ Entrega en La Paz",elalto:"🌆 Entrega en El Alto",nacional:"🇧🇴 Envío Nacional",delivery:"🛵 Delivery a domicilio"};
    const direccionDelivery=$("direccion-delivery")?$("direccion-delivery").value:"";
    let infoEnvio=etiquetasEnvio[tipoEnvioSeleccionado]||tipoEnvioSeleccionado;
    if(puntoEnvioSeleccionado) infoEnvio+=` — ${puntoEnvioSeleccionado}`;
    if(tipoEnvioSeleccionado==="delivery"&&direccionDelivery) infoEnvio+=` — ${direccionDelivery}`;

    let msg=`Hola, pedido *#${num}* — ya realicé el pago:%0A%0A`;
    let subtotal=0;const itemsG=[];
    carrito.forEach(item=>{
        msg+=`• ${item.nombre} x${item.cantidad}%0A  Talla: *${item.talla}*${item.dorsal&&item.dorsal!=="—"?" | Dorsal: *"+item.dorsal+"*":""}${item.color?" | Color: *"+item.color+"*":""} — ${item.precio} Bs%0A`;
        subtotal+=+item.precio*item.cantidad;itemsG.push({...item});
    });
    const desc=cuponAplicado?Math.round(subtotal*cuponAplicado.descuento/100):0;
    const total=subtotal-desc;
    msg+=`%0A%0A🚚 *Envío/Entrega:* ${infoEnvio}`;
    if(cuponAplicado) msg+=`%0ACupón: ${cuponAplicado.codigo} (-${desc} Bs)`;
    const numRef=$("num-referencia")?$("num-referencia").value.trim():"";
    msg+=`%0A%0A💰 *Total: ${total} Bs*`;
    if(numRef) msg+=`%0A📋 Referencia de pago: *${numRef}*`;
    msg+=`%0A%0A📸 *Adjunto mi comprobante de pago.*`;
    const ventanaWhatsApp=window.open("about:blank","_blank");
    if(!ventanaWhatsApp){
        mostrarToast("Permite las ventanas emergentes para continuar con WhatsApp.");
        return;
    }
    const fechaPedido=new Date();
    const pedido={
        numero:num,
        uid:usuarioActual.uid,
        usuario:perfilActual?.usuario||usuarioActual.displayName||"",
        correo:usuarioActual.email,
        fecha:fechaPedido.toLocaleString("es-BO"),
        fechaISO:fechaPedido.toISOString(),
        items:itemsG,
        subtotal,
        descuento:desc,
        total,
        envio:infoEnvio,
        referencia:numRef,
        estado:"pendiente"
    };
    try{
        await db.ref(`pedidos/${usuarioActual.uid}`).push(pedido);
    }catch(error){
        ventanaWhatsApp.close();
        mostrarToast(`No se pudo guardar el pedido: ${describirErrorFirebase(error)}`);
        return;
    }
    ventanaWhatsApp.location.href=`https://wa.me/59171208827?text=${msg}`;
    $("conf-numero-pedido").textContent="#"+num;
    const res=$("conf-resumen");
    res.innerHTML=itemsG.map(i=>`<p>• ${i.nombre} x${i.cantidad} — Talla: <strong>${i.talla}</strong>${i.color?" · "+i.color:""}</p>`).join("")+`<p class="conf-envio">🚚 ${infoEnvio}</p><p class="conf-total">Total: ${total} Bs</p>`;
    $("pago-modal").style.display="none";$("confirmacion-modal").classList.add("activo");
    lanzarConfeti();
    // Limpiar referencia
    if($("num-referencia")) $("num-referencia").value="";
    // Reset selector envío
    tipoEnvioSeleccionado="";puntoEnvioSeleccionado="";
    $$('input[name="tipo-envio"]').forEach(r=>r.checked=false);
    $$(".envio-opcion").forEach(op=>op.classList.remove("envio-opcion-activo"));
    ["lapaz","elalto","nacional","delivery"].forEach(id=>{const el=$("detalle-"+id);if(el)el.style.display="none";});
    const badge=$("costo-envio-badge");if(badge)badge.style.display="none";
    carrito=[];cuponAplicado=null;$("cupon-input").value="";$("descuento-aviso").style.display="none";actualizarCarrito();
});
$("conf-cerrar").addEventListener("click",()=>$("confirmacion-modal").classList.remove("activo"));

/* =============================================   CONFETI   */
function lanzarConfeti(){
    const canvas=$("confeti-canvas");const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;canvas.style.display="block";
    const piezas=[];const cols=["#c0c0c0","#6c6c6c","#c8c8c8","#7b7b7b","#979797","#ffffff"];
    for(let i=0;i<200;i++) piezas.push({x:Math.random()*canvas.width,y:-10,w:8+Math.random()*8,h:14+Math.random()*10,color:cols[Math.floor(Math.random()*cols.length)],rot:Math.random()*360,rotV:3+Math.random()*5,vy:3+Math.random()*4,vx:(Math.random()-.5)*3});
    let frame=0;
    function animar(){ctx.clearRect(0,0,canvas.width,canvas.height);piezas.forEach(p=>{p.y+=p.vy;p.x+=p.vx;p.rot+=p.rotV;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();});frame++;if(frame<150)requestAnimationFrame(animar);else{ctx.clearRect(0,0,canvas.width,canvas.height);canvas.style.display="none";}}
    animar();
}

/* =============================================   COMPARAR   */
function actualizarBarraComparar(){
    const barra=$("comparar-barra"),items=$("comparar-items");
    if(!compararLista.length){barra.style.display="none";return;}
    barra.style.display="flex";
    items.innerHTML=compararLista.map(p=>`<div class="comp-item"><img src="${p.imagenes[0]}" alt="${p.nombre}"><span>${p.nombre}</span></div>`).join("");
}
$("btn-comparar").addEventListener("click",()=>{
    if(compararLista.length<2){mostrarToast("Selecciona 2 jerseys para comparar");return;}
    const grid=$("comparar-grid");
    const campos=["nombre","precio","tallas","dorsales","calidad","categoria","stock"];
    const labels={"nombre":"Jersey","precio":"Precio","tallas":"Tallas","dorsales":"Dorsales","calidad":"Calidad","categoria":"Categoría","stock":"Stock"};
    grid.innerHTML=`
        <div class="comp-col comp-labels"><div class="comp-header"></div>${campos.map(c=>`<div class="comp-fila-label">${labels[c]}</div>`).join("")}</div>
        ${compararLista.map(p=>`<div class="comp-col"><div class="comp-header"><img src="${p.imagenes[0]}" alt="${p.nombre}"></div>${campos.map(c=>`<div class="comp-fila">${c==="precio"?p[c]+" Bs":(p[c]||"—")}</div>`).join("")}</div>`).join("")}`;
    $("comparar-modal").classList.add("activo");
});
$("btn-limpiar-comparar").addEventListener("click",()=>{compararLista=[];actualizarBarraComparar();renderProductos(productos);});
$("comparar-cerrar").addEventListener("click",()=>$("comparar-modal").classList.remove("activo"));

/* =============================================   HISTORIAL   */
$("ver-historial-btn").addEventListener("click",verPedidosCliente);
$("historial-cerrar").addEventListener("click",()=>$("historial-modal").classList.remove("activo"));

async function verPedidosCliente(){
    const lista=$("historial-lista");
    lista.innerHTML="";
    if(!usuarioActual){
        lista.innerHTML=`<p class="sin-historial">Inicia sesión para consultar tus pedidos.</p>`;
    }else{
        lista.innerHTML=`<p class="sin-historial">Cargando tus pedidos…</p>`;
        $("historial-modal").classList.add("activo");
        $("carrito-panel").style.display="none";
        try{
            const snapshot=await db.ref(`pedidos/${usuarioActual.uid}`).once("value");
            const pedidos=snapshot.val();
            lista.innerHTML="";
            if(!pedidos){
                lista.innerHTML=`<p class="sin-historial">Todavía no tienes pedidos registrados 📭</p>`;
            }else{
                Object.values(pedidos).sort((a,b)=>String(b.fechaISO||"").localeCompare(String(a.fechaISO||""))).forEach(p=>lista.appendChild(crearTarjetaPedido(p)));
            }
        }catch(error){
            lista.innerHTML=`<p class="sin-historial">${escaparHTML(describirErrorFirebase(error))}</p>`;
        }
    }
    $("historial-modal").classList.add("activo");
    $("carrito-panel").style.display="none";
}

function crearTarjetaPedido(pedido){
    const tarjeta=document.createElement("div");
    tarjeta.className="historial-item";
    const articulos=Array.isArray(pedido.items)?pedido.items:Object.values(pedido.items||{});
    tarjeta.innerHTML=`<div class="historial-header"><strong>#${escaparHTML(pedido.numero)}</strong><span>${escaparHTML(pedido.fecha)}</span></div>
        <ul>${articulos.map(item=>`<li>${escaparHTML(item.nombre)} x${escaparHTML(item.cantidad)} — Talla: <strong>${escaparHTML(item.talla)}</strong>${item.dorsal&&item.dorsal!=="—"?" | Dorsal: "+escaparHTML(item.dorsal):""}${item.color?" | "+escaparHTML(item.color):""}</li>`).join("")}</ul>
        <p class="historial-total">Estado: ${escaparHTML(pedido.estado||"pendiente")} · Total: ${escaparHTML(pedido.total)} Bs</p>`;
    return tarjeta;
}

/* =============================================   FAVORITOS   */
function toggleFavorito(id){const i=favoritos.indexOf(id);i===-1?favoritos.push(id):favoritos.splice(i,1);localStorage.setItem("favoritos",JSON.stringify(favoritos));$("contador-favoritos").textContent=favoritos.length||"";}
function renderFavoritos(){
    const lista=$("favoritos-lista");lista.innerHTML="";
    const favProds=productos.filter(p=>favoritos.includes(p.id));
    if(!favProds.length){lista.innerHTML=`<p class="sin-historial">No tienes favoritos aún.</p>`;return;}
    favProds.forEach(p=>{const d=document.createElement("div");d.className="fav-item";d.innerHTML=`<img src="${p.imagenes[0]}" alt="${p.nombre}"><div class="fav-info"><strong>${p.nombre}</strong><span>${p.precio} Bs</span></div><div class="fav-btns"><button class="fav-ver" data-id="${p.id}">👁 Ver</button><button class="fav-quitar" data-id="${p.id}">🗑</button></div>`;lista.appendChild(d);});
    $$(".fav-ver").forEach(b=>b.addEventListener("click",()=>{const p=productos.find(x=>x.id===+b.dataset.id);if(p){$("favoritos-modal").classList.remove("activo");abrirDetalle(p);}}));
    $$(".fav-quitar").forEach(b=>b.addEventListener("click",()=>{toggleFavorito(+b.dataset.id);renderFavoritos();renderProductos(productos);}));
}
$("btn-favoritos-nav").addEventListener("click",()=>{renderFavoritos();$("favoritos-modal").classList.add("activo");});
$("ver-favoritos-btn").addEventListener("click",()=>{renderFavoritos();$("favoritos-modal").classList.add("activo");$("carrito-panel").style.display="none";});
$("favoritos-cerrar").addEventListener("click",()=>$("favoritos-modal").classList.remove("activo"));

/* =============================================   NOTIF COMPRAS   */
const notifFicticias=[
    {nombre:"Carlos",ciudad:"Santa Cruz",jersey:"Manchester United"},
    {nombre:"Gabriela",ciudad:"La Paz",jersey:"Barcelona Retro"},
    {nombre:"Marco",ciudad:"Cochabamba",jersey:"Argentina 2022"},
    {nombre:"Luis",ciudad:"Oruro",jersey:"Real Madrid"},
    {nombre:"Sofía",ciudad:"Sucre",jersey:"Brasil Player Version"},
];
function iniciarNotifCompras(){
    let i=0;
    function mostrarNotif(){
        const n=notifFicticias[i%notifFicticias.length];
        const hace=Math.floor(Math.random()*59)+1;
        $("notif-texto").textContent=`${n.nombre} de ${n.ciudad} compró "${n.jersey}" hace ${hace} min`;
        const el=$("notif-compra");el.style.display="flex";el.classList.add("notif-show");
        setTimeout(()=>{el.classList.remove("notif-show");setTimeout(()=>el.style.display="none",500);},4000);i++;
    }
    setTimeout(()=>{mostrarNotif();setInterval(mostrarNotif,18000);},6000);
}

/* =============================================   CHAT FAQ   */
const chatRespuestas={
    envio:"🚚 Los envíos tardan entre 2 y 5 días hábiles según tu ciudad. Enviamos a toda Bolivia por bus o encomienda.",
    tallas:"📏 Puedes ver nuestra guía de tallas en el detalle de cada producto. Si dudas entre dos tallas, elige la más grande.",
    pago:"💳 Aceptamos pago por QR (código escaneado), transferencia bancaria al Banco Mercantil SCZ y efectivo en coordinación.",
    calidad:"⭐ Todos nuestros jerseys son de alta calidad AAA o Player Version. Trabajamos con proveedores certificados.",
    whatsapp:"📱 Te redirigiremos a WhatsApp para hablar directamente con un asesor."
};
$("chat-btn").addEventListener("click",()=>{
    const faq=$("chat-faq");faq.style.display=faq.style.display==="flex"?"none":"flex";
});
$("chat-cerrar").addEventListener("click",()=>{$("chat-faq").style.display="none";});
$$(".chat-opcion").forEach(btn=>btn.addEventListener("click",()=>{
    const resp=chatRespuestas[btn.dataset.resp];
    const body=$("chat-body");
    const userMsg=document.createElement("div");userMsg.className="chat-msg user";userMsg.textContent=btn.textContent;
    body.appendChild(userMsg);
    if(btn.dataset.resp==="whatsapp"){window.open("https://wa.me/59171208827","_blank");return;}
    setTimeout(()=>{const botMsg=document.createElement("div");botMsg.className="chat-msg bot";botMsg.textContent=resp;body.appendChild(botMsg);body.scrollTop=body.scrollHeight;},400);
}));

/* =============================================   MODAL DETALLE   */
function abrirDetalle(producto){
    let detIdx=0,tallaS=null,dorsalS=null,colorS=null;
    const ip=$("detalle-img-principal");ip.src=producto.imagenes[0];
    ip.onclick=()=>abrirGaleria(producto.imagenes,detIdx);

    // Zoom
    const zw=document.querySelector(".zoom-wrap"),zl=$("zoom-lupa");
    zw.addEventListener("mousemove",e=>{const rect=zw.getBoundingClientRect();const x=e.clientX-rect.left,y=e.clientY-rect.top;zl.style.display="block";zl.style.left=x-50+"px";zl.style.top=y-50+"px";zl.style.backgroundImage=`url(${ip.src})`;zl.style.backgroundSize="300%";zl.style.backgroundPosition=`${(x/rect.width)*100}% ${(y/rect.height)*100}%`;});
    zw.addEventListener("mouseleave",()=>{zl.style.display="none";});

    // Thumbs
    const dthumbs=$("detalle-thumbs");dthumbs.innerHTML="";
    producto.imagenes.forEach((src,i)=>{const t=document.createElement("img");t.src=src;t.className="det-thumb"+(i===0?" det-thumb-activo":"");t.addEventListener("click",()=>{detIdx=i;ip.src=src;dthumbs.querySelectorAll(".det-thumb").forEach((x,j)=>x.classList.toggle("det-thumb-activo",j===i));});dthumbs.appendChild(t);});

    $("detalle-badges").innerHTML=`${producto.esOferta?'<span class="badge-oferta">OFERTA</span>':""}${producto.agotado?'<span class="badge-agotado">AGOTADO</span>':""}<span class="badge-cat" style="background:${badgeColor[producto.categoria]||'#333333'}">${producto.categoria.toUpperCase()}</span>`;
    $("detalle-nombre").textContent=producto.nombre;
    $("detalle-visitas").innerHTML=(producto.visitas||0)>0?`<span class="visitas-badge">👁 ${producto.visitas} vistas hoy</span>`:"";
    $("detalle-vendidos").innerHTML=producto.vendidos&&producto.vendidos>0?`<span class="vendidos-det">${producto.vendidos} vendidos</span>`:"";
    // Personas viendo en detalle
    const viendoDet=Math.floor(Math.random()*12)+3;
    const viendoEl=$("detalle-visitas");
    if(viendoEl) viendoEl.innerHTML=`<span class="visitas-badge">👁 ${viendoDet} personas viendo esto</span>`;
    // Cuotas en detalle
    const cuotasDetEl=document.getElementById("detalle-cuotas");
    if(cuotasDetEl) cuotasDetEl.textContent=`o 3 cuotas de ${Math.ceil(+producto.precio/3)} Bs sin interés`;;

    $("detalle-precio").innerHTML=producto.esOferta&&producto.precioOriginal
        ?`<div class="precio-oferta"><span class="precio-antes">${producto.precioOriginal} Bs</span><span class="precio-ahora">${producto.precio} Bs</span><span class="ahorro-badge">Ahorras ${+producto.precioOriginal - +producto.precio} Bs</span></div>`
        :`<p class="precio">${producto.precio} Bs</p>`;

    clearInterval(countdownInterval);
    const cd=$("detalle-countdown");
    if(producto.esOferta&&producto.finOferta){
        cd.style.display="block";
        const tick=()=>{const diff=new Date(producto.finOferta)-new Date();if(diff<=0){cd.textContent="⏰ Oferta finalizada";clearInterval(countdownInterval);return;}const h=String(Math.floor(diff/3600000)).padStart(2,"0");const m=String(Math.floor((diff%3600000)/60000)).padStart(2,"0");const s=String(Math.floor((diff%60000)/1000)).padStart(2,"0");cd.innerHTML=`⏰ Oferta termina en <strong>${h}:${m}:${s}</strong>`;};tick();countdownInterval=setInterval(tick,1000);
    }else cd.style.display="none";

    $("detalle-descripcion").textContent=producto.descripcion||"Jersey de alta calidad. Contáctanos para más info.";

    // Tallas
    const ta=producto.tallas?producto.tallas.split(",").map(s=>s.trim()).filter(Boolean):["Única"];
    const tb=$("tallas-btns");tb.innerHTML="";tallaS=ta.length===1?ta[0]:null;
    ta.forEach(t=>{const b=document.createElement("button");b.className="sel-btn"+(ta.length===1?" sel-btn-activo":"");b.textContent=t;b.addEventListener("click",()=>{tallaS=t;tb.querySelectorAll(".sel-btn").forEach(x=>x.classList.remove("sel-btn-activo"));b.classList.add("sel-btn-activo");});tb.appendChild(b);});

    // Dorsales
    const da=producto.dorsales?producto.dorsales.split(",").map(s=>s.trim()).filter(Boolean):["—"];
    const db=$("dorsales-btns");db.innerHTML="";dorsalS=da.length===1?da[0]:null;
    da.forEach(d=>{const b=document.createElement("button");b.className="sel-btn"+(da.length===1?" sel-btn-activo":"");b.textContent=d;b.addEventListener("click",()=>{dorsalS=d;db.querySelectorAll(".sel-btn").forEach(x=>x.classList.remove("sel-btn-activo"));b.classList.add("sel-btn-activo");});db.appendChild(b);});

    // Colores
    const cc=$("colores-campo"),ccb=$("colores-btns");
    if(producto.colores){
        const ca=producto.colores.split(",").map(s=>s.trim()).filter(Boolean);
        ccb.innerHTML="";colorS=ca.length===1?ca[0]:null;cc.style.display="block";
        ca.forEach(c=>{const b=document.createElement("button");b.className="sel-btn"+(ca.length===1?" sel-btn-activo":"");b.textContent=c;b.addEventListener("click",()=>{colorS=c;ccb.querySelectorAll(".sel-btn").forEach(x=>x.classList.remove("sel-btn-activo"));b.classList.add("sel-btn-activo");});ccb.appendChild(b);});
    }else cc.style.display="none";

    // Stock
    const sn=parseInt(producto.stock);const sa=$("detalle-stock-aviso");
    if(producto.agotado){sa.style.display="block";sa.textContent="❌ Producto agotado";}
    else if(producto.stock&&sn<=4){sa.style.display="block";sa.textContent=`⚠️ ¡Solo quedan ${sn}!`;}
    else sa.style.display="none";

    const ba=$("detalle-agregar");ba.disabled=producto.agotado;ba.textContent=producto.agotado?"Agotado":"Agregar al carrito";
    ba.onclick=()=>{
        if(!tallaS){mostrarToast("👆 Selecciona una talla");return;}
        if(!dorsalS){mostrarToast("👆 Selecciona un dorsal");return;}
        agregarAlCarrito(producto,tallaS,dorsalS,colorS||"");cerrarDetalle();
    };

    const btnFav=$("detalle-fav");const isFavNow=favoritos.includes(producto.id);
    btnFav.textContent=isFavNow?"♥":"♡";
    btnFav.onclick=()=>{toggleFavorito(producto.id);btnFav.textContent=favoritos.includes(producto.id)?"♥":"♡";renderProductos(productos);};

    $("detalle-compartir").onclick=()=>{const txt=`${producto.nombre} — ${producto.precio} Bs\nFútbol Premier Bolivia`;navigator.share?navigator.share({title:producto.nombre,text:txt}):(navigator.clipboard.writeText(txt),mostrarToast("Enlace copiado"));};

    // También te puede gustar
    const similares=productos.filter(p=>p.id!==producto.id&&p.categoria===producto.categoria).slice(0,3);
    const tg=$("tambien-gusta");tg.innerHTML="";
    if(similares.length){tg.innerHTML=`<h4>También te puede gustar</h4><div class="tg-grid">${similares.map(p=>`<div class="tg-item" data-id="${p.id}"><img src="${p.imagenes[0]}" alt="${p.nombre}"><p>${p.nombre}</p><span>${p.precio} Bs</span></div>`).join("")}</div>`;tg.querySelectorAll(".tg-item").forEach(el=>el.addEventListener("click",()=>{const p=productos.find(x=>x.id===+el.dataset.id);if(p)abrirDetalle(p);}));}

    $("detalle-modal").classList.add("activo");document.body.style.overflow="hidden";
}
function cerrarDetalle(){$("detalle-modal").classList.remove("activo");document.body.style.overflow="";clearInterval(countdownInterval);}
$("detalle-cerrar").addEventListener("click",cerrarDetalle);
$("detalle-overlay").addEventListener("click",cerrarDetalle);
$("btn-guia-tallas").addEventListener("click",()=>$("talla-guia-modal").classList.add("activo"));
$("talla-guia-cerrar").addEventListener("click",()=>$("talla-guia-modal").classList.remove("activo"));

/* =============================================   EDITAR   */
function abrirEditar(p){
    $("edit-id").value=p.id;$("edit-nombre").value=p.nombre;$("edit-tallas").value=p.tallas;
    $("edit-dorsales").value=p.dorsales;$("edit-calidad").value=p.calidad;$("edit-colores").value=p.colores||"";
    $("edit-descripcion").value=p.descripcion||"";$("edit-categoria").value=p.categoria;
    $("edit-precio").value=p.precio;$("edit-stock").value=p.stock===null||p.stock===undefined?"":p.stock;$("edit-vendidos").value=p.vendidos||"";
    $("edit-es-oferta").checked=p.esOferta||false;$("edit-campo-oferta").style.display=p.esOferta?"block":"none";
    $("edit-precio-original").value=p.precioOriginal||"";$("edit-fin-oferta").value=p.finOferta||"";
    document.querySelectorAll("#editar-modal [data-admin-only]").forEach(elemento => {
        elemento.hidden = !adminLogueado;
    });
    $("editar-modal").classList.add("activo");
}
async function guardarEdicion(){
    if (!adminLogueado && rolActual !== "empleado") {
        mostrarToast("Tu rol no puede editar el catálogo.");
        return;
    }
    const id=+$("edit-id").value;const p=productos.find(x=>x.id===id);if(!p)return;
    if (rolActual === "empleado") {
        const precio = Number($("edit-precio").value);
        const stockTexto = $("edit-stock").value;
        const stock = stockTexto === "" ? null : Number(stockTexto);
        if (!Number.isFinite(precio) || precio <= 0) {
            mostrarToast("Ingresa un precio válido.");
            return;
        }
        if (stock !== null && (!Number.isInteger(stock) || stock < 0 || stock > 10000)) {
            mostrarToast("El stock debe ser un número entero entre 0 y 10.000.");
            return;
        }
        const cambios = {
            nombre: $("edit-nombre").value.trim(),
            tallas: $("edit-tallas").value.trim(),
            dorsales: $("edit-dorsales").value.trim(),
            calidad: $("edit-calidad").value.trim(),
            colores: $("edit-colores").value.trim(),
            descripcion: $("edit-descripcion").value.trim(),
            categoria: $("edit-categoria").value,
            precio,
            stock,
            agotado: stock === 0
        };
        try {
            const snapshot = await db.ref("productos").once("value");
            const lista = snapshot.val();
            const indice = Array.isArray(lista)
                ? lista.findIndex(producto => producto && String(producto.id) === String(id))
                : -1;
            if (indice < 0) throw new Error("No se encontró el producto en Firebase.");
            await db.ref(`productos/${indice}`).update(cambios);
            Object.assign(p, cambios);
            localStorage.setItem("productos", JSON.stringify(productos));
        } catch (error) {
            mostrarToast(`No se pudo guardar el producto: ${describirErrorFirebase(error)}`);
            console.error("Error al editar producto como empleado:", error);
            return;
        }
        renderProductos(productos);renderOfertas();renderListaAdmin();renderAdminStats();
        $("editar-modal").classList.remove("activo");
        mostrarToast("✅ Jersey actualizado");
        return;
    }
    p.nombre=$("edit-nombre").value.trim();p.tallas=$("edit-tallas").value.trim();p.dorsales=$("edit-dorsales").value.trim();
    p.calidad=$("edit-calidad").value.trim();p.colores=$("edit-colores").value.trim();
    p.descripcion=$("edit-descripcion").value.trim();p.categoria=$("edit-categoria").value;
    p.precio=$("edit-precio").value;p.stock=$("edit-stock").value||null;p.vendidos=+$("edit-vendidos").value||0;
    p.esOferta=$("edit-es-oferta").checked;p.precioOriginal=p.esOferta?$("edit-precio-original").value:null;p.finOferta=p.esOferta?$("edit-fin-oferta").value:null;
    guardarLS();renderProductos(productos);renderOfertas();renderListaAdmin();renderAdminStats();
    $("editar-modal").classList.remove("activo");mostrarToast("✅ Jersey actualizado");
}
$("editar-cerrar").addEventListener("click",()=>$("editar-modal").classList.remove("activo"));

/* =============================================   LISTA ADMIN   */
function renderListaAdmin(){
    const la=$("lista-admin");
    const busqueda=$("inventario-buscar").value.trim().toLocaleLowerCase("es");
    const filtroStock=$("inventario-filtro-stock").value;
    const visibles=productos.filter(p=>{
        const coincideTexto=`${p.nombre} ${p.categoria||""} ${p.tallas||""}`.toLocaleLowerCase("es").includes(busqueda);
        const stockConocido=p.stock!==null&&p.stock!==undefined&&p.stock!=="";
        const agotado=p.agotado||stockConocido&&+p.stock===0;
        const coincideStock=filtroStock==="todos"
            ||filtroStock==="bajo"&&stockConocido&&!agotado&&+p.stock<=3
            ||filtroStock==="agotado"&&agotado
            ||filtroStock==="sin-registro"&&!stockConocido;
        return coincideTexto&&coincideStock;
    });
    const resumen=$("inventario-resumen");
    const conStock=productos.filter(p=>p.stock!==null&&p.stock!==undefined&&p.stock!=="");
    const unidades=conStock.reduce((total,p)=>total+(+p.stock||0),0);
    const bajos=productos.filter(p=>p.agotado||(p.stock!==null&&p.stock!==undefined&&p.stock!==""&&+p.stock<=3)).length;
    resumen.innerHTML=`<div class="inventario-stat"><strong>${productos.length}</strong><span>Productos</span></div>
        <div class="inventario-stat"><strong>${unidades}</strong><span>Unidades registradas</span></div>
        <div class="inventario-stat"><strong>${bajos}</strong><span>Stock bajo o agotado</span></div>
        <div class="inventario-stat"><strong>${productos.reduce((total,p)=>total+(+p.vendidos||0),0)}</strong><span>Unidades vendidas</span></div>`;
    $("inventario-resultados").textContent=`Mostrando ${visibles.length} de ${productos.length} productos`;
    if(!productos.length){la.innerHTML=`<p class="admin-vacio">Aún no hay productos en el inventario.</p>`;return;}
    if(!visibles.length){la.innerHTML=`<p class="admin-vacio">No hay productos que coincidan con los filtros seleccionados.</p>`;return;}
    la.innerHTML=visibles.map(p=>{
        const stockConocido=p.stock!==null&&p.stock!==undefined&&p.stock!=="";
        const agotado=p.agotado||stockConocido&&+p.stock===0;
        const stockClass=agotado?"stock-agotado":stockConocido&&+p.stock<=3?"stock-bajo":"";
        const stockTexto=agotado?"Agotado":stockConocido?`${escaparHTML(p.stock)} en stock`:"Stock sin registrar";
        const accionesInventario=adminLogueado
            ? `<div class="admin-prod-btns">
                <button type="button" aria-label="Editar ${escaparHTML(p.nombre)}" onclick="abrirEditar(productos.find(x=>x.id===${+p.id}))">✏️</button>
                <button type="button" aria-label="${agotado?"Marcar disponible":"Marcar agotado"}" onclick="toggleAgotado(${+p.id})">${agotado?"↩️":"❌"}</button>
                <button type="button" aria-label="Eliminar ${escaparHTML(p.nombre)}" onclick="eliminarProd(${+p.id})">🗑</button>
            </div>`
            : rolActual==="empleado"
                ? `<div class="admin-prod-btns">
                    <button type="button" aria-label="Editar ${escaparHTML(p.nombre)}" onclick="abrirEditar(productos.find(x=>x.id===${+p.id}))">✏️</button>
                </div>`
                : "";
        return `<div class="admin-prod-item">
            <img src="${escaparHTML(p.imagenes?.[0]||"img/logo.png")}" alt="${escaparHTML(p.nombre)}">
            <div class="admin-prod-info">
                <strong>${escaparHTML(p.nombre)}</strong>
                <span>${escaparHTML(p.precio)} Bs · ${escaparHTML(p.vendidos||0)} vendidos</span>
                <div class="admin-prod-badges">
                    <span class="admin-prod-badge ${stockClass}">${stockTexto}</span>
                    <span class="admin-prod-badge">${escaparHTML(p.categoria||"Sin categoría")}</span>
                    <span class="admin-prod-badge">${escaparHTML(p.tallas||"Sin tallas")}</span>
                </div>
            </div>
            ${accionesInventario}
        </div>`;
    }).join("");
}
function toggleAgotado(id){
    if (!adminLogueado) return;
    const p=productos.find(x=>x.id===id);
    if(!p)return;
    const stockConocido=p.stock!==null&&p.stock!==undefined&&p.stock!=="";
    const sinUnidades=stockConocido&&+p.stock===0;
    const estabaAgotado=p.agotado||sinUnidades;
    p.agotado=!estabaAgotado;
    if(p.agotado&&stockConocido)p.stock="0";
    else if(estabaAgotado&&sinUnidades)p.stock=null;
    guardarLS();renderProductos(productos);renderOfertas();renderListaAdmin();renderAdminStats();
    mostrarToast(p.agotado?"❌ Agotado":"✅ Disponible");
}
function eliminarProd(id){if(!adminLogueado)return;if(confirm("¿Eliminar?")){productos=productos.filter(p=>p.id!==id);guardarLS();renderProductos(productos);renderOfertas();renderListaAdmin();renderAdminStats();mostrarToast("🗑 Eliminado");}}

async function renderAdminClientes(){
    const contenedor=$("lista-clientes");
    if(!adminLogueado&&rolActual!=="cajero"){
        contenedor.innerHTML=`<p class="admin-vacio">Tu rol no tiene acceso a los pedidos.</p>`;
        return;
    }
    contenedor.innerHTML=`<p class="admin-vacio">Cargando clientes y pedidos…</p>`;
    try{
        const snapshot=await db.ref("usuarios").once("value");
        const usuarios=snapshot.val()||{};
        const clientes=Object.entries(usuarios).filter(([uid,perfil])=>uid!==usuarioActual.uid&&perfil&&perfil.usuario);
        if(!clientes.length){
            contenedor.innerHTML=`<p class="admin-vacio">Aún no hay clientes registrados.</p>`;
            aplicarFiltroPedidosAdmin();
            return;
        }
        const registros=await Promise.all(clientes.map(async ([uid,perfil])=>{
            const pedidosSnapshot=await db.ref(`pedidos/${uid}`).once("value");
            const pedidos=Object.entries(pedidosSnapshot.val()||{}).map(([id,pedido])=>({...pedido,id}));
            return {uid,perfil,pedidos:pedidos.sort((a,b)=>String(b.fechaISO||"").localeCompare(String(a.fechaISO||"")))};
        }));
        contenedor.innerHTML=registros.map(({uid,perfil,pedidos})=>`<article class="cliente-card">
            <div class="cliente-cabecera">
                <div><strong>${escaparHTML(perfil.usuario)}</strong><span>${escaparHTML(perfil.correo)}</span></div>
                <span>${pedidos.length} pedido${pedidos.length===1?"":"s"}</span>
            </div>
            <p class="cliente-id">ID: ${escaparHTML(uid)}</p>
            ${pedidos.length?pedidos.map(pedido=>{
                const articulos=Array.isArray(pedido.items)?pedido.items:Object.values(pedido.items||{});
                const estado=ESTADOS_PEDIDO.includes(pedido.estado)?pedido.estado:"pendiente";
                const pago=pedido.pago;
                const detallePago=pago?.estado==="pagado"
                    ? `<p class="pedido-pago-confirmado">Pagado por ${pago.metodo==="qr"?"QR":"efectivo"} · ${escaparHTML(pago.monto)} Bs · ${escaparHTML(new Date(pago.fechaISO).toLocaleString("es-BO"))}</p>`
                    : estado==="cancelado"
                        ? `<p class="pedido-pago-pendiente">Pedido cancelado; no registrar pagos.</p>`
                        : `<p class="pedido-pago-pendiente">Pago pendiente de confirmar</p>`;
                const controlesPago=!pago&&estado!=="cancelado"&&(adminLogueado||rolActual==="cajero")
                    ? `<div class="pedido-pago-control">
                        <label for="pago-metodo-${escaparHTML(pedido.id)}">Método
                            <select id="pago-metodo-${escaparHTML(pedido.id)}">
                                <option value="efectivo">Efectivo</option>
                                <option value="qr">QR</option>
                            </select>
                        </label>
                        <button type="button" class="pedido-pago-guardar" data-uid="${escaparHTML(uid)}" data-pedido-id="${escaparHTML(pedido.id)}">Registrar pago recibido</button>
                    </div>`
                    : "";
                return `<div class="pedido-admin" data-estado="${escaparHTML(pedido.estado||"pendiente")}">
                    <div class="pedido-cabecera"><strong>Pedido #${escaparHTML(pedido.numero)}</strong><span>${escaparHTML(pedido.fecha)}</span><span>${escaparHTML(pedido.estado||"pendiente")}</span></div>
                    <ul>${articulos.map(item=>`<li>${escaparHTML(item.nombre)} ×${escaparHTML(item.cantidad)} · Talla ${escaparHTML(item.talla)}${item.dorsal&&item.dorsal!=="—"?" · "+escaparHTML(item.dorsal):""}</li>`).join("")}</ul>
                    <p class="pedido-admin-total">${escaparHTML(pedido.total)} Bs</p>
                    ${detallePago}
                    ${controlesPago}
                    ${adminLogueado||rolActual==="cajero"?`<div class="pedido-estado-control">
                        <label for="pedido-estado-${escaparHTML(pedido.id)}">Estado
                            <select id="pedido-estado-${escaparHTML(pedido.id)}">
                                ${ESTADOS_PEDIDO.map(opcion=>`<option value="${opcion}"${opcion===estado?" selected":""}${pago?.estado==="pagado"&&opcion==="cancelado"?" disabled":""}>${opcion.charAt(0).toUpperCase()+opcion.slice(1)}</option>`).join("")}
                            </select>
                        </label>
                        <button type="button" class="pedido-estado-guardar" data-uid="${escaparHTML(uid)}" data-pedido-id="${escaparHTML(pedido.id)}">Guardar</button>
                    </div>`:""}
                </div>`;
            }).join(""):`<p class="admin-vacio">Sin pedidos registrados.</p>`}
        </article>`).join("");
        contenedor.querySelectorAll(".pedido-estado-guardar").forEach(boton=>boton.addEventListener("click",()=>actualizarEstadoPedido(
            boton.dataset.uid,
            boton.dataset.pedidoId,
            $(`pedido-estado-${boton.dataset.pedidoId}`).value,
            boton
        )));
        contenedor.querySelectorAll(".pedido-pago-guardar").forEach(boton=>boton.addEventListener("click",()=>registrarPagoPedido(
            boton.dataset.uid,
            boton.dataset.pedidoId,
            boton.closest(".pedido-pago-control").querySelector("select").value,
            boton
        )));
        aplicarFiltroPedidosAdmin();
    }catch(error){
        contenedor.innerHTML=`<p class="admin-vacio">${escaparHTML(describirErrorFirebase(error))}</p>`;
        $("pedidos-resultados").textContent="";
        console.error("Error al cargar clientes y pedidos:",error);
    }
}

async function actualizarEstadoPedido(uid,pedidoId,estado,boton) {
    if(!adminLogueado&&rolActual!=="cajero") return;
    if(!ESTADOS_PEDIDO.includes(estado)) {
        mostrarToast("Selecciona un estado válido.");
        return;
    }
    boton.disabled=true;
    try {
        await db.ref(`pedidos/${uid}/${pedidoId}/estado`).set(estado);
        mostrarToast("Estado del pedido actualizado");
        renderAdminStats();
        renderAdminClientes();
    } catch(error) {
        mostrarToast(describirErrorFirebase(error));
        console.error("Error al actualizar el estado del pedido:",error);
    } finally {
        boton.disabled=false;
    }
}

async function registrarPagoPedido(uid,pedidoId,metodo,boton) {
    if (!adminLogueado && rolActual !== "cajero") return;
    if (!["efectivo","qr"].includes(metodo)) {
        mostrarToast("Selecciona efectivo o QR.");
        return;
    }
    if (!confirm(`¿Confirmas que recibiste el pago completo por ${metodo === "qr" ? "QR" : "efectivo"}?`)) return;
    boton.disabled=true;
    try {
        const pedidoRef=db.ref(`pedidos/${uid}/${pedidoId}`);
        const snapshot=await pedidoRef.once("value");
        const pedido=snapshot.val();
        const monto=Number(pedido?.total);
        if (!pedido || pedido.estado==="cancelado" || !Number.isFinite(monto) || monto<=0) {
            throw new Error("El pedido no se puede cobrar.");
        }
        const pago={
            estado:"pagado",
            metodo,
            monto,
            fechaCaja:fechaCajaLocal(),
            fechaISO:new Date().toISOString(),
            registradoPor:usuarioActual.uid
        };
        const resultado=await pedidoRef.child("pago").transaction(
            actual=>actual===null?pago:undefined,
            null,
            false
        );
        if (!resultado.committed) {
            mostrarToast("Este pedido ya tiene un pago registrado.");
            return;
        }
        mostrarToast("Pago recibido y registrado.");
        renderAdminClientes();
        renderAdminStats();
        if (document.querySelector('.admin-tabs .atab.activo')?.dataset.tab==="caja") renderCaja();
    } catch (error) {
        mostrarToast(`No se pudo registrar el pago: ${describirErrorFirebase(error)}`);
        console.error("Error al registrar un pago:",error);
    } finally {
        boton.disabled=false;
    }
}

function aplicarFiltroPedidosAdmin(){
    const contenedor=$("lista-clientes");
    $("pedidos-sin-resultados")?.remove();
    const estado=$("pedidos-filtro-estado").value;
    const clientes=[...contenedor.querySelectorAll(".cliente-card")];
    let pedidosVisibles=0;
    let clientesVisibles=0;
    clientes.forEach(cliente=>{
        const pedidos=[...cliente.querySelectorAll(".pedido-admin")];
        let clienteTienePedidosVisibles=false;
        pedidos.forEach(pedido=>{
            const visible=estado==="todos"||pedido.dataset.estado===estado;
            pedido.hidden=!visible;
            if(visible){
                pedidosVisibles++;
                clienteTienePedidosVisibles=true;
            }
        });
        const clienteSinPedidos=pedidos.length===0;
        const visible=estado==="todos"
            ?clienteSinPedidos||clienteTienePedidosVisibles
            :clienteTienePedidosVisibles;
        cliente.hidden=!visible;
        if(visible)clientesVisibles++;
    });
    const resultados=$("pedidos-resultados");
    if(!clientes.length){
        resultados.textContent="";
        return;
    }
    resultados.textContent=estado==="todos"
        ?`${pedidosVisibles} pedidos en ${clientesVisibles} clientes`
        :`${pedidosVisibles} pedidos ${$("pedidos-filtro-estado").selectedOptions[0].textContent.toLowerCase()}`;
    if(estado!=="todos"&&!pedidosVisibles){
        contenedor.insertAdjacentHTML("beforeend",'<p class="admin-vacio" id="pedidos-sin-resultados">No hay pedidos pendientes.</p>');
    }else{
        $("pedidos-sin-resultados")?.remove();
    }
}

async function renderAdminEncargos() {
    const contenedor = $("lista-encargos-admin");
    if (!adminLogueado) {
        contenedor.innerHTML = `<p class="admin-vacio">Se requiere una sesión administrativa verificada.</p>`;
        return;
    }
    contenedor.innerHTML = `<p class="admin-vacio">Cargando encargos…</p>`;
    try {
        const snapshot = await db.ref("encargos").once("value");
        const grupos = snapshot.val() || {};
        const solicitudes = Object.entries(grupos).flatMap(([uid, grupo]) =>
            Object.entries(grupo || {}).map(([id, solicitud]) => ({ uid, id, solicitud }))
        ).sort((a, b) => String(b.solicitud.fecha || "").localeCompare(String(a.solicitud.fecha || "")));
        if (!solicitudes.length) {
            contenedor.innerHTML = `<p class="admin-vacio">Todavía no hay solicitudes de camisetas.</p>`;
            return;
        }
        contenedor.innerHTML = solicitudes.map(({ uid, id, solicitud }) => `<article class="encargo-admin-card" data-uid="${escaparHTML(uid)}" data-encargo-id="${escaparHTML(id)}">
            <div class="encargo-admin-cabecera">
                <div><strong>${escaparHTML(solicitud.camiseta || "Camiseta sin especificar")}</strong><span>${escaparHTML(solicitud.fecha ? new Date(solicitud.fecha).toLocaleString("es-BO") : "Fecha desconocida")}</span></div>
                <span>${escaparHTML(solicitud.estado || "pendiente")}</span>
            </div>
            <p class="encargo-admin-detalle">Talla: <strong>${escaparHTML(solicitud.talla || "—")}</strong> · Nombre: <strong>${escaparHTML(solicitud.nombrePersonalizado || "Sin personalizar")}</strong> · Dorsal: <strong>${escaparHTML(solicitud.dorsal || "—")}</strong><br>Detalles: ${escaparHTML(solicitud.notas || "Sin comentarios")}</p>
            <p class="encargo-admin-meta">Cliente: ${escaparHTML(solicitud.usuario || "—")} · ${escaparHTML(solicitud.correo || "—")}<br>ID: ${escaparHTML(uid)}</p>
            ${solicitud.fotoPath ? `<a class="encargo-admin-foto" href="#" data-foto-path="${escaparHTML(solicitud.fotoPath)}" target="_blank" rel="noopener noreferrer">🖼 Ver foto de referencia</a>` : '<p class="encargo-admin-meta">Si el cliente adjuntó una referencia, la envía directamente por WhatsApp.</p>'}
            <label>Estado de la solicitud
                <select class="encargo-admin-estado">
                    ${["pendiente", "contactado", "en proceso", "completado", "rechazado"].map(estado => `<option value="${estado}" ${solicitud.estado === estado ? "selected" : ""}>${estado}</option>`).join("")}
                </select>
            </label>
        </article>`).join("");
        contenedor.querySelectorAll(".encargo-admin-foto").forEach(enlace => {
            enlace.href = enlace.dataset.fotoPath;
            enlace.textContent = "🖼 Ver foto de referencia";
        });
        contenedor.querySelectorAll(".encargo-admin-estado").forEach(select => {
            select.addEventListener("change", async () => {
                const tarjeta = select.closest(".encargo-admin-card");
                select.disabled = true;
                try {
                    await db.ref(`encargos/${tarjeta.dataset.uid}/${tarjeta.dataset.encargoId}/estado`).set(select.value);
                    tarjeta.querySelector(".encargo-admin-cabecera>span").textContent = select.value;
                    mostrarToast("Estado del encargo actualizado");
                } catch (error) {
                    mostrarToast(`No se pudo actualizar el encargo: ${describirErrorFirebase(error)}`);
                    console.error("Error al actualizar estado del encargo:", error);
                    await renderAdminEncargos();
                } finally {
                    select.disabled = false;
                }
            });
        });
    } catch (error) {
        contenedor.innerHTML = `<p class="admin-vacio">${escaparHTML(describirErrorFirebase(error))}</p>`;
        console.error("Error al cargar encargos:", error);
    }
}

/* =============================================   STATS ADMIN   */
function renderAdminStats(){
    const stats=$("admin-stats");
    const alertas=$("admin-alertas-lista");
    if(!stats||!alertas||!esPersonal())return;

    const conStockBajo=productos.filter(producto=>{
        const stockRegistrado=producto.stock!==null&&producto.stock!==undefined&&producto.stock!=="";
        return Boolean(producto.agotado)||(stockRegistrado&&Number(producto.stock)<=3);
    }).sort((a,b)=>{
        const stockA=a.agotado?0:Number(a.stock);
        const stockB=b.agotado?0:Number(b.stock);
        return stockA-stockB;
    });
    const puedeVerVentas=adminLogueado||rolActual==="cajero";
    $("admin-resumen-nota").textContent=puedeVerVentas
        ?"Ingresos con pago confirmado. Los pedidos aún no cobrados no se cuentan."
        :"Alertas calculadas con las existencias registradas en el catálogo.";
    stats.innerHTML=puedeVerVentas
        ? `<div class="stat-card"><h4 id="admin-ventas-hoy">—</h4><p>Ingresos cobrados hoy</p></div>
            <div class="stat-card"><h4 id="admin-ventas-mes">—</h4><p>Ingresos cobrados este mes</p></div>
            <div class="stat-card"><h4 id="admin-pedidos-pendientes">—</h4><p>Pedidos pendientes</p></div>
            <div class="stat-card"><h4>${conStockBajo.length}</h4><p>Productos con stock bajo</p></div>`
        : `<div class="stat-card"><h4>${productos.length}</h4><p>Productos en catálogo</p></div>
            <div class="stat-card"><h4>${conStockBajo.length}</h4><p>Productos con stock bajo</p></div>`;
    alertas.innerHTML=conStockBajo.length
        ? conStockBajo.slice(0,5).map(producto=>{
            const agotado=Boolean(producto.agotado)||Number(producto.stock)===0;
            const stock=producto.stock!==null&&producto.stock!==undefined&&producto.stock!=="";
            return `<article class="admin-alerta-stock">
                <strong>${escaparHTML(producto.nombre||"Producto sin nombre")}</strong>
                <span class="${agotado?"agotado":""}">${agotado?"Agotado":stock?`Quedan ${escaparHTML(producto.stock)} unidades`:"Agotado"}</span>
            </article>`;
        }).join("")+(conStockBajo.length>5?`<p class="admin-alertas-mas">Y ${conStockBajo.length-5} producto${conStockBajo.length-5===1?"":"s"} más. Consulta el inventario completo.</p>`:"")
        : `<p class="admin-alertas-vacio">No hay productos agotados ni con stock bajo.</p>`;

    if(puedeVerVentas) cargarResumenVentasAdmin();
    else $("admin-resumen-ventas-estado").hidden=true;
}

async function cargarResumenVentasAdmin(){
    const estado=$("admin-resumen-ventas-estado");
    const solicitud=++solicitudResumenVentas;
    estado.hidden=false;
    estado.textContent="Cargando resumen de pedidos…";
    if(typeof db==="undefined"){
        estado.textContent="No se pudo cargar el resumen: Firebase no está disponible.";
        return;
    }
    try{
        const usuariosSnapshot=await db.ref("usuarios").once("value");
        const usuarios=usuariosSnapshot.val()||{};
        const pedidosPorUsuario=await Promise.all(Object.keys(usuarios).map(async uid=>{
            const snapshot=await db.ref(`pedidos/${uid}`).once("value");
            return Object.values(snapshot.val()||{}).filter(Boolean);
        }));
        if(solicitud!==solicitudResumenVentas)return;

        const ahora=new Date();
        const inicioHoy=new Date(ahora.getFullYear(),ahora.getMonth(),ahora.getDate());
        const inicioManana=new Date(ahora.getFullYear(),ahora.getMonth(),ahora.getDate()+1);
        const inicioMes=new Date(ahora.getFullYear(),ahora.getMonth(),1);
        const pedidos=pedidosPorUsuario.flat();
        let ventasHoy=0;
        let ventasMes=0;
        let pendientes=0;
        pedidos.forEach(pedido=>{
            if(pedido.estado==="pendiente")pendientes++;
            if(pedido.pago?.estado!=="pagado")return;
            const fecha=new Date(pedido.pago.fechaISO||"");
            const total=Number(pedido.pago.monto);
            if(!Number.isFinite(fecha.getTime())||!Number.isFinite(total)||total<0)return;
            if(fecha>=inicioHoy&&fecha<inicioManana)ventasHoy+=total;
            if(fecha>=inicioMes&&fecha<inicioManana)ventasMes+=total;
        });
        const formatoBs=valor=>`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:2}).format(valor)} Bs`;
        $("admin-ventas-hoy").textContent=formatoBs(ventasHoy);
        $("admin-ventas-mes").textContent=formatoBs(ventasMes);
        $("admin-pedidos-pendientes").textContent=String(pendientes);
        estado.hidden=true;
    }catch(error){
        if(solicitud!==solicitudResumenVentas)return;
        estado.textContent=`No se pudo cargar el resumen de pedidos: ${describirErrorFirebase(error)}`;
        console.error("Error al cargar el resumen de ventas:",error);
    }
}

function fechaCajaLocal(fecha=new Date()) {
    const ano=fecha.getFullYear();
    const mes=String(fecha.getMonth()+1).padStart(2,"0");
    const dia=String(fecha.getDate()).padStart(2,"0");
    return `${ano}-${mes}-${dia}`;
}

function formatoBs(valor) {
    return `${new Intl.NumberFormat("es-BO",{minimumFractionDigits:2,maximumFractionDigits:2}).format(valor)} Bs`;
}

function redondearBs(valor) {
    return Math.round((valor+Number.EPSILON)*100)/100;
}

async function obtenerPagosCaja(dia) {
    const usuariosSnapshot=await db.ref("usuarios").once("value");
    const usuarios=usuariosSnapshot.val()||{};
    const pedidosPorUsuario=await Promise.all(Object.keys(usuarios).map(async uid=>{
        const snapshot=await db.ref(`pedidos/${uid}`).once("value");
        return Object.values(snapshot.val()||{}).filter(Boolean);
    }));
    const pagos=pedidosPorUsuario.flat()
        .map(pedido=>pedido.pago)
        .filter(pago=>pago&&pago.estado==="pagado"&&pago.fechaCaja===dia);
    return {
        efectivo:redondearBs(pagos.filter(pago=>pago.metodo==="efectivo").reduce((suma,pago)=>suma+Number(pago.monto||0),0)),
        qr:redondearBs(pagos.filter(pago=>pago.metodo==="qr").reduce((suma,pago)=>suma+Number(pago.monto||0),0))
    };
}

function actualizarVistaCierreCaja() {
    const fondo=Number($("caja-fondo-inicial").value);
    const contadoTexto=$("caja-efectivo-contado").value;
    const contado=Number(contadoTexto);
    const esperado=fondo+resumenCajaHoy.efectivo;
    $("caja-efectivo-esperado").textContent=Number.isFinite(esperado)?formatoBs(esperado):"—";
    $("caja-diferencia").textContent=contadoTexto!==""&&Number.isFinite(contado)
        ?formatoBs(contado-esperado)
        :"Ingresa el efectivo contado";
}

async function renderCaja() {
    if (!adminLogueado && rolActual!=="cajero") return;
    const solicitud=++solicitudCaja;
    const estado=$("caja-cierre-estado");
    estado.textContent="Cargando pagos del día…";
    $("caja-cerrar-dia").disabled=true;
    try {
        const hoy=fechaCajaLocal();
        const resumen=await obtenerPagosCaja(hoy);
        if (solicitud!==solicitudCaja) return;
        resumenCajaHoy=resumen;
        $("caja-efectivo-ventas").textContent=formatoBs(resumenCajaHoy.efectivo);
        $("caja-qr-total").textContent=formatoBs(resumenCajaHoy.qr);
        $("caja-total-recibido").textContent=formatoBs(resumenCajaHoy.efectivo+resumenCajaHoy.qr);

        const cierreRef=db.ref(`cierresCaja/${usuarioActual.uid}/${hoy}`);
        const cierreSnapshot=await cierreRef.once("value");
        if (solicitud!==solicitudCaja) return;
        const cierre=cierreSnapshot.val();
        $("caja-fondo-inicial").disabled=Boolean(cierre);
        $("caja-efectivo-contado").disabled=Boolean(cierre);
        $("caja-cerrar-dia").disabled=Boolean(cierre);
        if (cierre) {
            $("caja-fondo-inicial").value=cierre.fondoInicial;
            $("caja-efectivo-contado").value=cierre.efectivoContado;
            estado.textContent=`Cierre registrado ${new Date(cierre.cerradoEn).toLocaleString("es-BO")}. Diferencia: ${formatoBs(cierre.diferencia)}.`;
        } else {
            $("caja-fondo-inicial").value="0";
            $("caja-efectivo-contado").value="";
            estado.textContent=`Cierre pendiente para ${hoy}.`;
        }
        actualizarVistaCierreCaja();
    } catch (error) {
        if (solicitud!==solicitudCaja) return;
        estado.textContent=`No se pudo cargar caja: ${describirErrorFirebase(error)}`;
        console.error("Error al cargar los pagos para caja:",error);
    }
}

async function registrarCierreCaja() {
    if (!adminLogueado && rolActual!=="cajero") return;
    const fondo=redondearBs(Number($("caja-fondo-inicial").value));
    const contadoTexto=$("caja-efectivo-contado").value;
    const contado=redondearBs(Number(contadoTexto));
    if (!Number.isFinite(fondo)||fondo<0||!Number.isFinite(contado)||contadoTexto===""||contado<0) {
        mostrarToast("Ingresa el fondo inicial y el efectivo contado.");
        return;
    }
    const hoy=fechaCajaLocal();
    const boton=$("caja-cerrar-dia");
    boton.disabled=true;
    try {
        const cierreRef=db.ref(`cierresCaja/${usuarioActual.uid}/${hoy}`);
        const cierreActual=await cierreRef.once("value");
        if (cierreActual.exists()) {
            await renderCaja();
            mostrarToast("Ya existe un cierre registrado para hoy.");
            return;
        }
        resumenCajaHoy=await obtenerPagosCaja(hoy);
        $("caja-efectivo-ventas").textContent=formatoBs(resumenCajaHoy.efectivo);
        $("caja-qr-total").textContent=formatoBs(resumenCajaHoy.qr);
        $("caja-total-recibido").textContent=formatoBs(resumenCajaHoy.efectivo+resumenCajaHoy.qr);
    } catch (error) {
        $("caja-cierre-estado").textContent=`No se pudo actualizar caja: ${describirErrorFirebase(error)}`;
        console.error("Error al actualizar pagos antes del cierre:",error);
        boton.disabled=false;
        return;
    }
    const efectivoEsperado=redondearBs(fondo+resumenCajaHoy.efectivo);
    const ahora=new Date();
    const cierre={
        fecha:hoy,
        efectivoVentas:resumenCajaHoy.efectivo,
        qrTotal:resumenCajaHoy.qr,
        fondoInicial:fondo,
        efectivoEsperado,
        efectivoContado:contado,
        diferencia:redondearBs(contado-efectivoEsperado),
        totalRecaudado:redondearBs(resumenCajaHoy.efectivo+resumenCajaHoy.qr),
        cerradoPor:usuarioActual.uid,
        cerradoEn:ahora.toISOString()
    };
    try {
        const resultado=await db.ref(`cierresCaja/${usuarioActual.uid}/${hoy}`).transaction(
            actual=>actual===null?cierre:undefined,
            null,
            false
        );
        if (!resultado.committed) throw new Error("Ya existe un cierre para hoy en esta cuenta.");
        mostrarToast("Cierre diario registrado.");
        await renderCaja();
    } catch (error) {
        $("caja-cierre-estado").textContent=`No se pudo registrar el cierre: ${describirErrorFirebase(error)}`;
        console.error("Error al registrar el cierre diario:",error);
    } finally {
        if (!$("caja-fondo-inicial").disabled) boton.disabled=false;
    }
}

/* =============================================   CUPONES   */
function crearCupon(){const codigo=$("cupon-codigo").value.trim().toUpperCase();const desc=+$("cupon-descuento").value;if(!codigo||!desc||desc<1||desc>100){alert("Completa código y descuento");return;}if(cupones.find(c=>c.codigo===codigo)){alert("Ese código ya existe");return;}cupones.push({codigo,descuento:desc});localStorage.setItem("cupones",JSON.stringify(cupones));$("cupon-codigo").value="";$("cupon-descuento").value="";renderListaCupones();mostrarToast(`🎟 Cupón ${codigo} creado`);}
function renderListaCupones(){const lc=$("lista-cupones");if(!cupones.length){lc.innerHTML=`<p style="color:var(--text3);text-align:center;padding:20px">No hay cupones</p>`;return;}lc.innerHTML=cupones.map((c,i)=>`<div class="cupon-item"><strong>${c.codigo}</strong><span>${c.descuento}% off</span><button onclick="eliminarCupon(${i})">🗑</button></div>`).join("");}
function eliminarCupon(i){cupones.splice(i,1);localStorage.setItem("cupones",JSON.stringify(cupones));renderListaCupones();mostrarToast("🗑 Cupón eliminado");}

/* =============================================   RESEÑAS   */
$$(".estrella-inp").forEach(s=>{
    s.addEventListener("mouseover",()=>$$(".estrella-inp").forEach((x,i)=>x.classList.toggle("activa",i<=+s.dataset.val-1)));
    s.addEventListener("mouseout",()=>$$(".estrella-inp").forEach((x,i)=>x.classList.toggle("activa",i<=estrellasVal-1)));
    s.addEventListener("click",()=>{estrellasVal=+s.dataset.val;$$(".estrella-inp").forEach((x,i)=>x.classList.toggle("activa",i<=estrellasVal-1));});
});
$("enviar-resena").addEventListener("click",()=>{
    const nombre=$("resena-nombre").value.trim();const ciudad=$("resena-ciudad").value.trim();const texto=$("resena-texto").value.trim();
    if(!nombre||!ciudad||!estrellasVal||!texto){mostrarToast("⚠️ Completa todos los campos");return;}
    resenas.push({id:Date.now(),nombre,ciudad,estrellas:estrellasVal,texto,aprobada:false,fecha:new Date().toLocaleDateString("es-BO")});
    localStorage.setItem("resenas",JSON.stringify(resenas));
    $("resena-nombre").value="";$("resena-ciudad").value="";$("resena-texto").value="";estrellasVal=0;$$(".estrella-inp").forEach(x=>x.classList.remove("activa"));
    mostrarToast("✅ Reseña enviada, será revisada pronto");
});
function renderResenas(){
    const grid=$("resenas-grid");grid.innerHTML="";
    const aprobadas=resenas.filter(r=>r.aprobada);
    if(!aprobadas.length){grid.innerHTML=`<p style="color:var(--text3);text-align:center;grid-column:1/-1;padding:20px">Sé el primero en dejar una reseña ⭐</p>`;return;}
    aprobadas.forEach(r=>{const d=document.createElement("div");d.className="testimonio reveal";d.innerHTML=`<div class="estrellas">${"⭐".repeat(r.estrellas)}</div><p>"${r.texto}"</p><span>— ${r.nombre}, ${r.ciudad} · ${r.fecha}</span>`;grid.appendChild(d);});initReveal();
}
function renderResenasPendientes(){
    const cont=$("resenas-pendientes");cont.innerHTML="";
    const pend=resenas.filter(r=>!r.aprobada);
    if(!pend.length){cont.innerHTML=`<p style="color:var(--text3);text-align:center;padding:20px">No hay reseñas pendientes ✅</p>`;return;}
    pend.forEach(r=>{const d=document.createElement("div");d.className="resena-pend-item";d.innerHTML=`<div class="resena-pend-header"><strong>${r.nombre} — ${r.ciudad}</strong><span>${"⭐".repeat(r.estrellas)}</span></div><p>"${r.texto}"</p><div class="resena-pend-btns"><button class="btn-aprobar" data-id="${r.id}">✅ Aprobar</button><button class="btn-rechazar" data-id="${r.id}">❌ Rechazar</button></div>`;cont.appendChild(d);});
    $$(".btn-aprobar").forEach(b=>b.addEventListener("click",()=>{const r=resenas.find(x=>x.id===+b.dataset.id);if(r){r.aprobada=true;localStorage.setItem("resenas",JSON.stringify(resenas));renderResenas();renderResenasPendientes();mostrarToast("✅ Reseña aprobada");}}));
    $$(".btn-rechazar").forEach(b=>b.addEventListener("click",()=>{resenas=resenas.filter(x=>x.id!==+b.dataset.id);localStorage.setItem("resenas",JSON.stringify(resenas));renderResenasPendientes();mostrarToast("🗑 Reseña rechazada");}));
}

/* =============================================   ACCESO   */
$("cuenta-password").addEventListener("keydown",event=>{if(event.key==="Enter")$("cuenta-submit").click();});
$("cuenta-email").addEventListener("keydown",event=>{if(event.key==="Enter")$("cuenta-submit").click();});
function cerrarAdmin(){
    auth.signOut().then(()=>mostrarToast("👋 Sesión cerrada")).catch(error=>mostrarToast(describirErrorFirebase(error)));
}

/* =============================================   GALERÍA   */
let gImgs=[],gIdx=0;
const gModal=$("galeria-modal"),gImg=$("galeria-img"),gPrev=$("galeria-prev"),gNext=$("galeria-next"),gCerrar=$("galeria-cerrar"),gCont=$("galeria-contador"),gThumbs=$("galeria-thumbs");
function abrirGaleria(imgs,i){gImgs=imgs;gIdx=i||0;gModal.classList.add("activo");document.body.style.overflow="hidden";syncG();renderGT();}
function cerrarGaleria(){gModal.classList.remove("activo");document.body.style.overflow="";}
function syncG(dir){if(dir){gImg.classList.add(dir==="next"?"salir-izq":"salir-der");setTimeout(()=>{gImg.classList.remove("salir-izq","salir-der");gImg.src=gImgs[gIdx];gImg.classList.add(dir==="next"?"entrar-der":"entrar-izq");setTimeout(()=>gImg.classList.remove("entrar-der","entrar-izq"),300);},200);}else gImg.src=gImgs[gIdx];gCont.textContent=`${gIdx+1} / ${gImgs.length}`;const solo=gImgs.length<=1;gPrev.style.display=solo?"none":"flex";gNext.style.display=solo?"none":"flex";$$(".gthumb").forEach((t,i)=>t.classList.toggle("gthumb-activo",i===gIdx));}
function renderGT(){gThumbs.innerHTML="";if(gImgs.length<=1){gThumbs.style.display="none";return;}gThumbs.style.display="flex";gImgs.forEach((src,i)=>{const t=document.createElement("img");t.src=src;t.className="gthumb"+(i===gIdx?" gthumb-activo":"");t.addEventListener("click",()=>{const d=i>gIdx?"next":"prev";gIdx=i;syncG(d);});gThumbs.appendChild(t);});}
gNext.addEventListener("click",()=>{gIdx=(gIdx+1)%gImgs.length;syncG("next");});
gPrev.addEventListener("click",()=>{gIdx=(gIdx-1+gImgs.length)%gImgs.length;syncG("prev");});
gCerrar.addEventListener("click",cerrarGaleria);
document.querySelector(".galeria-overlay").addEventListener("click",cerrarGaleria);
document.addEventListener("keydown",e=>{
    if(gModal.classList.contains("activo")){if(e.key==="ArrowRight"){gIdx=(gIdx+1)%gImgs.length;syncG("next");}else if(e.key==="ArrowLeft"){gIdx=(gIdx-1+gImgs.length)%gImgs.length;syncG("prev");}else if(e.key==="Escape")cerrarGaleria();}
    if($("detalle-modal").classList.contains("activo")&&e.key==="Escape")cerrarDetalle();
    if($("talla-guia-modal").classList.contains("activo")&&e.key==="Escape")$("talla-guia-modal").classList.remove("activo");
    if($("talla-selector-modal").style.display==="flex"&&e.key==="Escape") cerrarTallaModal();
});
let tX=0;
gModal.addEventListener("touchstart",e=>{tX=e.touches[0].clientX;},{passive:true});
gModal.addEventListener("touchend",e=>{const d=tX-e.changedTouches[0].clientX;if(Math.abs(d)<50)return;if(d>0){gIdx=(gIdx+1)%gImgs.length;syncG("next");}else{gIdx=(gIdx-1+gImgs.length)%gImgs.length;syncG("prev");}},{passive:true});


/* =============================================   TIMER CARRITO   */
let timerCarrito=null;
function iniciarTimerCarrito(){
    if(timerCarrito) return; // ya corriendo
    let seg=15*60;
    const el=$("timer-cuenta");
    const timerDiv=$("carrito-timer");
    if(timerDiv) timerDiv.style.display="block";
    timerCarrito=setInterval(()=>{
        seg--;
        if(!el) return;
        const m=String(Math.floor(seg/60)).padStart(2,"0");
        const s=String(seg%60).padStart(2,"0");
        el.textContent=`${m}:${s}`;
        if(seg<=0){
            clearInterval(timerCarrito);timerCarrito=null;
            el.textContent="¡Expirado!";
            if(timerDiv) timerDiv.style.background="#6c6c6c";
        }
    },1000);
}

/* =============================================   BARRA ENVÍO GRATIS   */
const ENVIO_GRATIS_MIN=500; // Bs mínimo para envío gratis
function actualizarBarraEnvio(){
    const subtotal=carrito.reduce((acc,i)=>acc+(+i.precio*i.cantidad),0);
    const prog=$("envio-barra-prog");
    const texto=$("envio-barra-texto");
    if(!prog||!texto) return;
    const porcentaje=Math.min((subtotal/ENVIO_GRATIS_MIN)*100,100);
    prog.style.width=porcentaje+"%";
    if(subtotal>=ENVIO_GRATIS_MIN){
        texto.innerHTML=`🎉 ¡Envío gratis desbloqueado!`;
        prog.style.background="#c0c0c0";
    }else{
        const falta=ENVIO_GRATIS_MIN-subtotal;
        texto.innerHTML=`Solo <strong>${falta} Bs</strong> más para envío gratis 🚚`;
        prog.style.background="var(--accent)";
    }
}

/* =============================================   POPUP SALIDA   */
let exitPopupMostrado=false;
document.addEventListener("mouseleave",e=>{
    if(e.clientY<10&&!exitPopupMostrado&&carrito.length>0){
        exitPopupMostrado=true;
        $("exit-popup").classList.add("activo");
    }
});
const exitCerrar=$("exit-cerrar");
const exitBtn=$("exit-btn");
if(exitCerrar) exitCerrar.addEventListener("click",()=>$("exit-popup").classList.remove("activo"));
if(exitBtn) exitBtn.addEventListener("click",()=>{
    $("exit-popup").classList.remove("activo");
    // Aplicar cupón automáticamente
    const cupon=cupones.find(c=>c.codigo==="PREMIER10");
    if(cupon){cuponAplicado=cupon;$("descuento-aviso").style.display="block";$("descuento-aviso").textContent=`✅ Cupón "PREMIER10" — 10% off aplicado`;actualizarCarrito(true);}
    $("carrito-panel").style.display="block";
    document.querySelector(".catalogo").scrollIntoView({behavior:"smooth"});
});

/* =============================================   BADGE MÁS VENDIDO   */
function marcarMasVendido(){
    if(!productos.length) return;
    const maxVendidos=Math.max(...productos.map(p=>+p.vendidos||0));
    if(maxVendidos===0) return;
    productos.forEach(p=>p.esMasVendido=(+p.vendidos||0)===maxVendidos&&maxVendidos>0);
}

/* =============================================   UTILS   */
function mostrarToast(txt){const t=$("toast");t.textContent=txt;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2800);}
function guardarLS(){
    localStorage.setItem("productos",JSON.stringify(productos));
    if (typeof db !== "undefined" && adminLogueado) {
        db.ref("productos").set(productos).catch(error=>{
            mostrarToast(`No se pudo guardar el inventario en Firebase: ${describirErrorFirebase(error)}`);
            console.error("Error guardando en Firebase:",error);
        });
    }
}
function limpiarFormulario(){["imagen","img-url","nombre","tallas","dorsales","calidad","colores","descripcion","precio","vendidos","precio-original","fin-oferta","stock"].forEach(id=>{if($(id))$(id).value="";});$("es-oferta").checked=false;$("campo-precio-original").style.display="none";}
let modoPersonal = false;
function aplicarModoPersonal(activo) {
    modoPersonal = activo;
    $("cuenta-box").classList.toggle("cuenta-box-dividida", activo);
    $("cuenta-bienvenida").hidden = !activo;
    $("cuenta-titulo").textContent = activo ? "Acceso del personal" : "Acceso a tu cuenta";
    $("cuenta-modo-personal").textContent = activo ? "← Volver al acceso de clientes" : "Acceso del personal";
    $("cuenta-email").placeholder = activo ? "Correo o usuario del personal" : "tu@correo.com";
    $("cuenta-email-label").textContent = activo ? "Correo o usuario del personal" : "Correo electrónico";
    document.querySelector(".cuenta-tabs").style.display = activo ? "none" : "flex";
    if (activo) document.querySelector('.cuenta-tab[data-cuenta-vista="ingresar"]').click();
}
$("cuenta-modo-personal").addEventListener("click", () => aplicarModoPersonal(!modoPersonal));