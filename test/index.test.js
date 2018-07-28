const { TwoBitFile } = require('../src')

describe('.2bit data store', () => {
  it('loads some small bits of data from foo.2bit', async () => {
    const t = new TwoBitFile({
      path: require.resolve('./data/foo.2bit'),
      seqChunkSize: 3,
    })

    expect(await t.getSequence('foo', 3, 4)).toBe(undefined)
    expect(await t.getSequence('chr1', 0, 2)).toBe('NN')
    expect(await t.getSequence('chr1', 3, 4)).toBe('N')
    expect(await t.getSequence('chr1', 45, 50)).toBe('NNACT')
    expect(await t.getSequence('chr1', 156, 159)).toBe('CgN')
    expect(await t.getSequence('chr1', 155, 159)).toBe('NCgN')
    expect(await t.getSequence('chr1', 155, 158)).toBe('NCg')
    expect(await t.getSequence('chr1', 154, 158)).toBe('CNCg')
    expect(await t.getSequence('chr1', 85, 136)).toBe(
      'GGGagagagagactctagcatcctcctacctcacNNacCNctTGGACNCcC',
    )
    const fullSeq =
      'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNACTCTATCTATCTATCTATCTATCTTTTTCCCCCCGGGGGGagagagagactctagcatcctcctacctcacNNacCNctTGGACNCcCaGGGatttcNNNcccNNCCNCgN'
    expect(await t.getSequence('chr1', 0, 159)).toBe(fullSeq)
    expect(await t.getSequence('chr1', 0, 300)).toBe(fullSeq)
    expect(await t.getSequence('chr1', 0)).toBe(fullSeq)
    expect(await t.getSequence('chr1')).toBe(fullSeq)
  })

  it('loads some data from T_ko.2bit', async () => {
    const t = new TwoBitFile({
      path: require.resolve('./data/T_ko.2bit'),
    })

    let pythonReaderOutput =
      'ATGATCCTCGACACTGACTACATAACCGAGGATGGAAAGCCTGTCATAAGAATTTTCAAG AAGGAAAACGGCGAGTTTAAGATTGAGTACGACCGGACTTTTGAACCCTACTTCTACGCC CTCCTGAAGGACGATTCTGCCATTGAGGAAGTCAAGAAGATAACCGCCGAGAGGCACGGG ACGGTTGTAACGGTTAAGCGGGTTGAAAAGGTTCAGAAGAAGTTCCTCGGGAGACCAGTT GAGGTCTGGAAACTCTACTTTACTCATCCGCAGGACGTCCCAGCGATAAGGGACAAGATA CGAGAGCATCCAGCAGTTATTGACATCTACGAGTACGACATACCCTTCGCCAAGCGCTAC CTCATAGACAAGGGATTAGTGCCAATGGAAGGCGACGAGGAGCTGAAAATGCTCGCCTTC GACATTGAAACTCTCTACCATGAGGGCGAGGAGTTCGCCGAGGGGCCAATCCTTATGATA AGCTACGCCGACGAGGAAGGGGCCAGGGTGATAACTTGGAAGAACGTGGATCTCCCCTAC GTTGACGTCGTCTCGACGGAGAGGGAGATGATAAAGCGCTTCCTCCGTGTTGTGAAGGAG AAAGACCCGGACGTTCTCATAACCTACAACGGCGACAACTTCGACTTCGCCTATCTGAAA AAGCGCTGTGAAAAGCTCGGAATAAACTTCGCCCTCGGAAGGGATGGAAGCGAGCCGAAG ATTCAGAGGATGGGCGACAGGTTTGCCGTCGAAGTGAAGGGACGGATACACTTCGATCTC TATCCTGTGATAAGACGGACGATAAACCTGCCCACATACACGCTTGAGGCCGTTTATGAA GCCGTCTTCGGTCAGCCGAAGGAGAAGGTTTACGCTGAGGAAATAACCACAGCCTGGGAA ACCGGCGAGAACCTTGAGAGAGTCGCCCGCTACTCGATGGAAGATGCGAAGGTCACATAC GAGCTTGGGAAGGAGTTCCTTCCGATGGAGGCCCAGCTTTCTCGCTTAATCGGCCAGTCC CTCTGGGACGTCTCCCGCTCCAGCACTGGCAACCTCGTTGAGTGGTTCCTCCTCAGGAAG GCCTATGAGAGGAATGAGCTGGCCCCGAACAAGCCCGATGAAAAGGAGCTGGCCAGAAGA CGGCAGAGCTATGAAGGAGGCTATGTAAAAGAGCCCGAGAGAGGGTTGTGGGAGAACATA GTGTACCTAGATTTTAGATGCCATCCAGCCGATACGAAGGTTGTCGTCAAGGGGAAGGGG ATTATAAACATCAGCGAGGTTCAGGAAGGTGACTATGTCCTTGGGATTGACGGCTGGCAG AGAGTTAGAAAAGTATGGGAATACGACTACAAAGGGGAGCTTGTAAACATAAACGGGTTA AAGTGTACGCCCAATCATAAGCTTCCCGTTGTTACAAAGAACGAACGACAAACGAGAATA AGAGACAGTCTTGCTAAGTCTTTCCTTACTAAAAAAGTTAAGGGCAAGATAATAACCACT CCCCTTTTCTATGAAATAGGCAGAGCGACAAGTGAGAATATTCCAGAAGAAGAGGTTCTC AAGGGAGAGCTCGCTGGCATACTATTGGCTGAAGGAACGCTCTTGAGGAAAGACGTTGAA TACTTTGATTCATCCCGCAAAAAACGGAGGATTTCACACCAGTATCGTGTTGAGATAACC ATTGGGAAAGACGAGGAGGAGTTTAGGGATCGTATCACATACATTTTTGAGCGTTTGTTT GGGATTACTCCAAGCATCTCGGAGAAGAAAGGAACTAACGCAGTAACACTCAAAGTTGCG AAGAAGAATGTTTATCTTAAAGTCAAGGAAATTATGGACAACATAGAGTCCCTACATGCC CCCTCGGTTCTCAGGGGATTCTTCGAAGGCGACGGTTCAGTAAACAGGGTTAGGAGGAGT ATTGTTGCAACCCAGGGTACAAAGAACGAGTGGAAGATTAAACTGGTGTCAAAACTGCTC TCCCAGCTTGGTATCCCTCATCAAACGTACACGTATCAGTATCAGGAAAATGGGAAAGAT CGGAGCAGGTATATACTGGAGATAACTGGAAAGGACGGATTGATACTGTTCCAAACACTC ATTGGATTCATCAGTGAAAGAAAGAACGCTCTGCTTAATAAGGCAATATCTCAGAGGGAA ATGAACAACTTGGAAAACAATGGATTTTACAGGCTCAGTGAATTCAATGTCAGCACGGAA TACTATGAGGGCAAGGTCTATGACTTAACTCTTGAAGGAACTCCCTACTACTTTGCCAAT GGCATATTGACCCATAACTCCCTGTACCCCTCAATCATCATCACCCACAACGTCTCGCCG GATACGCTCAACAGAGAAGGATGCAAGGAATATGACGTTGCCCCACAGGTCGGCCACCGC TTCTGCAAGGACTTCCCAGGATTTATCCCGAGCCTGCTTGGAGACCTCCTAGAGGAGAGG CAGAAGATAAAGAAGAAGATGAAGGCCACGATTGACCCGATCGAGAGGAAGCTCCTCGAT TACAGGCAGAGGGCCATCAAGATCCTGGCAAACAGCATCCTACCCGAGGAATGGCTTCCA GTCCTCGAGGAAGGGGAGGTTCACTTCGTCAGGATTGGAGAGCTCATAGACCGGATGATG GAGGAAAATGCTGGGAAAGTAAAGAGAGAGGGCGAGACGGAAGTGCTTGAGGTCAGTGGG CTTGAAGTCCCGTCCTTTAACAGGAGAACTAAGAAGGCCGAGCTCAAGAGAGTAAAGGCC CTGATTAGGCACGATTATTCTGGCAAGGTCTACACCATCAGACTGAAGTCGGGGAGGAGA ATAAAGATAACCTCTGGCCACAGCCTCTTCTCTGTGAGAAACGGGGAGCTCGTTGAAGTT ACGGGCGATGAACTAAAGCCAGGTGACCTCGTTGCAGTCCCGCGGAGATTGGAGCTTCCT GAGAGAAACCACGTGCTGAACCTCGTTGAACTGCTCCTTGGAACGCCAGAAGAAGAAACT TTGGACATCGTCATGACGATCCCAGTCAAGGGTAAGAAGAACTTCTTTAAAGGGATGCTC AGGACTTTGCGCTGGATTTTCGGAGAGGAAAAGAGGCCCAGAACCGCGAGACGCTATCTC AGGCACCTTGAGGATCTGGGCTATGTCCGGCTTAAGAAGATCGGCTACGAAGTCCTCGAC TGGGACTCACTTAAGAACTACAGAAGGCTCTACGAGGCGCTTGTCGAGAACGTCAGATAC AACGGCAACAAGAGGGAGTACCTCGTTGAATTCAATTCCATCCGGGATGCAGTTGGCATA ATGCCCCTAAAAGAGCTGAAGGAGTGGAAGATCGGCACGCTGAACGGCTTCAGAATGAGC CCGCTCATTGAAGTGGACGAGTCGTTAGCAAAGCTCCTCGGCTACTACGTGAGCGAGGGC TATGCAAGAAAGCAGAGGAATCCCAAAAACGGCTGGAGCTACAGCGTGAAGCTCTACAAC GAAGACCCTGAAGTGCTGGACGATATGGAGAGACTCGCCAGCAGGTTTTTCGGGAAGGTG AGGCGGGGCAGGAACTACGTTGAGATACCGAAGAAGATCGGCTACCTGCTCTTTGAGAAC ATGTGCGGTGTCCTAGCGGAGAACAAGAGGATTCCCGAGTTCGTCTTCACGTCCCCGAAA GGGGTTCGGCTGGCCTTCCTTGAGGGGTACTTCATCGGCGATGGCGACGTCCACCCGAAC AAGAGACTCAGGCTCTCAACGAAAAGCGAGCTTTTAGCGAACCAGCTCGTCCTCCTCTTG AACTCGGTGGGGGTCTCTGCTGTAAAACTTGGGCACGACAGCGGCGTTTACAGGGTCTAT ATAAACGAGGAGCTCCCGTTCGTAAAGCTGGACAAGAAAAAGAACGCCTACTACTCACAC GTGATCCCCAAGGAAGTCCTGAGCGAGGTCTTTGGGAAGGTTTTCCAGAAAAACGTCAGT CCTCAGACCTTCAGGAAGATGGTCGAGGACGGAAGACTCGATCCCGAAAAGGCCCAGAGG CTCTCCTGGCTCATTGAGGGGGACGTAGTGCTCGACCGCGTTGAGTCCGTTGATGTGGAA GACTACGATGGTTATGTCTATGACCTGAGCGTCGAGGACAACGAGAACTTCCTCGTTGGC TTTGGGTTGGTCTATGCTCACAACAGCTACTACGGTTACTACGGCTATGCAAGGGCGCGC TGGTACTGCAAGGAGTGTGCAGAGAGCGTAACGGCCTGGGGAAGGGAGTACATAACGATG ACCATCAAGGAGATAGAGGAAAAGTACGGCTTTAAGGTAATCTACAGCGACACCGACGGA TTTTTTGCCACAATACCTGGAGCCGATGCTGAAACCGTCAAAAAGAAGGCTATGGAGTTC CTCAAGTATATCAACGCCAAACTTCCGGGCGCGCTTGAGCTCGAGTACGAGGGCTTCTAC AAACGCGGCTTCTTCGTCACGAAGAAGAAGTATGCGGTGATAGACGAGGAAGGCAAGATA ACAACGCGCGGACTTGAGATTGTGAGGCGTGACTGGAGCGAGATAGCGAAAGAGACGCAG GCGAGGGTTCTTGAAGCTTTGCTAAAGGACGGTGACGTCGAGAAGGCCGTGAGGATAGTC AAAGAAGTTACCGAAAAGCTGAGCAAGTACGAGGTTCCGCCGGAGAAGCTGGTGATCCAC GAGCAGATAACGAGGGATTTAAAGGACTACAAGGCAACCGGTCCCCACGTTGCCGTTGCC AAGAGGTTGGCCGCGAGAGGAGTCAAAATACGCCCTGGAACGGTGATAAGCTACATCGTG CTCAAGGGCTCTGGGAGGATAGGCGACAGGGCGATACCGTTCGACGAGTTCGACCCGACG AAGCACAAGTACGACGCCGAGTACTACATTGAGAACCAGGTTCTCCCAGCCGTTGAGAGA ATTCTGAGAGCCTTCGGTTACCGCAAGGAAGACCTGCGCTACCAGAAGACGAGACAGGTT GGTTTGAGTGCTTGGCTGAAGCCGAAGGGAACTTGACCTTTCCATTTGTTTTCCAGCGGA TAACCCTTTAACTTCCCTTTCAAAAACTCCCTTTAGGGAAAGACCATGAAGATAGAAATC CGGCGGCGCCCGGTTAAATACGCTAGGATAGAAGTGAAGCCAGACGGCAGGGTAGTCGTC ACTGCCCCCGAGGGGTTCAACGTTGAGAAGTTCATAGCAAAGAACGCCGCCTGGCTGGAG GGGAAGCTGGCCCAGATTGAAGGTCTGAAAGAGCTTGCAGAGTCGGGCTTTCCCCTGAAC GGCGAGTTCTACAAGGTCATACACGGAAGGAGGGCGAAAGTTCATGACAGCTTTAGGACC GTTGTTCTCCCCCCTTATCCCGAAGACATGCGGGAAGAACTGAAAAGGCTTCTCCGGCCG GAGATATTTGGGCTTATTGAAAAATACGCAGGAAAAATGGGAGTATCCCCCGGCAAGGTC TTCATCCGTTCGCAGAGGACAAGGTGGGGCAGCTGTTCTGGAAAGGGCAACCTGAACTTC AACCTTCGCCTGATAGCCCTTCCGCCGGAGCTCAGGGAGTACGTTGTCGTCCACGAGCTT GCTCACCTTAAGCACAGAAACCACTCAAAGGCCTTCTGGAGCCTTGTCTCCCGCTTCTAC CCGGACTACCGCTCCGCAAGGGAAGAGCTGAAGAAGTGGTGGAGCATTCTGGAGCTGAAC CCGTACTGGCGGTGGCTGGAGGGAAGGGAGTGACGCTGAAGGGAGTTTTAAAGCTCCTCC TTCTTTCAGCGGACGAAATAGCTGTCGCGGTCTTTATCTTTGTAGTTCTCCCCGGATTTG GGGTTGATGTGCCCTTGAAAGTATCCGTTCCACTTTTGGTGCTCCTGCTCCTCAAGGATA TTTTAATCGCCCCATACGTCCTCGGAGGCGGACTCGAAAAGAGGCCTTTAACTGGCCCTG AGGCTTTGATAGGGATGGAGGCGGTGGTCGTTGAAGACCTATCTCCAGAGGGTATCGTCA AAGTTGGGAACGAGCTGTGGAGAGGGGTCTGCTTAAACGGAAGGGCCAAGAGGGGAGAAA AAGTCAGGATCGTTGGATTCAGGGGGAACCTCCTACTACTGGAACGCCCAGAGTCCTGAG AACCTCTGCCAGCTCTTCGGGCCTGTTGGTGGTGAATGAGATGCTCCAGCCTTTAGTTCT TTCAATGAGAACGCAGGCCTTCCCTGGGTAAGTGTAGTGTATCGTCCCGCTGCAGCTCAT CCAGCCCTCTGAAATTCTGACGAGCTTTATCTCGTCGAGCCGGATCGTCTTTCTGGCGAG GAGACCGAGGGCACTTCTGATTTTCAGTCTCTCCTCATCCACTTCAATCTTTAGCTGCAT CAGGTCAAGGGCTATTGCCACAAACGGAAGAAGAAAAACGAGGAGAAACGTCATGTCTTC GCCTGCCAGGTATGAAGCTCCTATTCCTATGGTCATTCCTAGGAAGGCTGGGAGCATTAT GAGGAGCATCTTCCAGCTCCTGACGGTCTCGGAGTAGATGGCCACCACCGAGGGATTTTC CACTACCTCTTTAAAGCCCTTTTCCAAAGGTTACCAGGTGATAAGATGGTTCGGATAATG CCCGTTGACAGGCTGAGCGATGAGGAGGTAAGAGAAATTCTCACAAAGTACCGGAAGATA GCGCTCGTCGGCGCCTCACCAAAGCCGGAGCGCGATGCTAACAGGGTCATGCGCTATCTC CTCGAACACGGCTATGAGGTCTATCCCGTGAACCCGCGCTACGATGAGGTTCTCGGGAGG AAGTGCTATCCTAGCGTTCTTGACATCCCGGATGAGGTTGAAATCGTTGACCTCTTCGTT AGGCCAGAGTTCACTATGGACTACGTGGAACAGGCGATAAAGAAGGGTGCGAAGGTGGTC TGGTTCCAGTTCAACACCTACAACAGGGAGGCGTTCAGGAAAGCGAAAGAAGCGGGCCTT ACAGCAGTCGCTCACAGGTGCATAAAGCAGGAGCACGAGAGGCTTATCGGGTAATTCCAA GGAGCTCAAGGAGTTCTTTGGTGTTCACCACGTCAATCTCCTCTATTTCCTTCAGTCTCT TGTCGTTGTTCCACAGGGGGCTTTTACTTTTAGGGCCAGTGCCACAAAGTCAGCGTCATC TTTGTCGGGGGTTATTCGAGTGCTAGAGGTATGAACTCGGCGTAGAACCCCTCGTTTACG AATATGACATGCTCTTTAAGAACGGACAGTATTTCCTCGAACTCTTTCTCTCCGATCTTT GCTTTTTTCAGGACTTCGTCCCTGTGCTCGTGAAGCTCTTCCAGTGCAAACTCGGGACTT ATAAGTCTCCCTGATACCAAGAACACGAGCTCTCTGGTTACTGTTGATTTCCCGAAGAAA GAGAATAGCACGTTTGTGTTAACTACGAGAAGAATATCTTCTCTCAAGGTACTCGCCCCT TCCCATTTTCGCCTTCCGTCCGAGTTCTATTGCATCCTCTTCTGAGAGTTCGGAGTTCTT GAGCATCTCATTGAGCCTTGCGAGGGTTTTCAGTCTCTCCGCGATAGTCTTTGCTATCAA ATCGGCCAGCTTTTCGTCCACACTCGGGGGGACCTTGACCACTATGTCTCCCACGCTATC ACCGCTCTTACTACGCCGCTCTGCTTATAACGGTTTATCCTCTGTACCTCAGCACGTGGA TGTCCCTTACGACCCTGTGCCTCTCCTCGTAGTCAGGGTACCTCCCGAGGACTTCAAAGC CGAGCTTCACGAGCCACTTCCTCTCCTTCCGGTATATTCCACCGCCGCTCAGCTTGTAGG CCGGGAAGACAAAGACAACCTTTCCGTTTCTTTTCAGAACGTCGGCAAAGCTCTCGAAGA CCGAATAATAGAAGCGGTCGAGCTCGTTGGCCAGCTTTATGGCCTCGCCCCTACTCGGGT GTCTTTTGAGGGGCTTTCCGAGGTAGGGTTCGGTGACTATAGCATCGAACCTCTGTCTAA AACACTTCTTCAGCTTTCTGGCGTCGCAGACTTCTAAGTGAGCCGAGTTTTTGAGCCGGA ACTCTTTCCTCAGCCAGGTGAGATTCTTCTTGGCATCCCTGATCTGCCCCTCGTCGCGGT CGCTCCCGTAGGCAGTAAGCCCCTGAAGAACGAACTCCTGAACCACCGTTCCAATGCCGC AGAACGGATCCAGGAAGCTCCCCTTTCTAACCTCCGTCAGGTTCACCATTATCCTTGCCA GTCTCGGCGGAATCGAGAGGATGGGCTTCTGGACGGGCCTCTCGACGTCGAGCTTCTTCA GCTCGAAGGGGTCCGTTACTCTGATCGTCTCGCCGACGAGGAAGCTCCCGTCTTCCCTGA ACAGAAAGACGAAGTCCTTAACCTCCGGAAAGCCCTTGAGGATGAGCTCCGCGGGCATGG CATATGTTTTTGCGGGCTTGAAGAACTTAGCTGACCCCTCCTCTTTGAACCTCTTCTTTA TCTCGCTCCCGAGCTTACGCCAGAGCTTCCAGTCGCTCTTCCCGTAGAGACTGACCGTAA AAAGCCTGGAGTACTCCAGCTCCTCCAGAGCCTCTTCTCCCTCCCCAACTATCCTGACGA GCTTGAGAGAACCGCCTATCCACCGGAAATATCTCTCCACCGAAGGCTTGGATTCAAAGA CTATCCAGTTATGCTCTTCCTCAATCGATTTAACTTTTAGTCCGAATCTTCTCCCGAAAG AGTAAAATTCAGCACGGCTGAGCTCTGAATTCTTTCCTAAGATTACTCCATACATGGATT GCGCTTTGAGTAAGCTTTTAAAAAGGTTCCGCGTAAATATAATTGGGATTTAATCAAAAA CATGAGTCCACGGTGACCACCTATGCTGACGGTTGAGGTTCTTAAATCAGCTGACATCAT ACCTGATCCATATACGCGCGCGGTAACCTACGCCCGGTTAGGTGAGACGCTTGTGCGCAG GAAGGATCCCCTTTATAAGGAGGCGTTTTTGAAGGCGTTTGACGCGTTGAACGATATAAA CGATCCCGAACTTCTACTCAGGGCAACCCTAGCCATAGGGTACCACATGGGAAAAGCTGG GATCAAAGCGTACTACAAGGTGTTTCTGAGGGTGGTTGAAGATTCCTCTGCTTTATCTCC TCCAGTTAGAGACGAAATTTTAGCACTTGCCGTCAGGTACCTAGTGAGCCTCGGGAACCT CGGACAGGCCGTAACACTCGCGACGGAAATTTCGGATAAGAAACTTGCACAGGCCACTCT CTTCTCCATAGTCCGGGCGGGGAGCAGGTTAATTCAGGACAGCTCCCTAAAGGCGGCCTA CAAGCTCAGGAAAATCAAGCTGGCGCTTGAGTATATAACTGACGAGCCATATCGCTCAAA GGCCCTGATAGAGCTGGCAAAGGCTTTTATTGCGGTGGGGAGTTATGAGAGGGCGCTGGC CACGATTAGGGAAATAGAATCCCCAGATTGGGCTAAGGTTGCCTTCAAGGAACTTACCTT TAGTTTGGGCAGGATGGGCGTCATAGACAAGTTCATAAGCGGGCTTTCTGAGCTGGCGGA TGATTTCAGCTCGCGTTTTGGTGCCGATTTTGTTGTGGAGCTTGCAGAGGCTTTTCTGCT TGCTGGGAAACCGGATATTGCCGTTGGAATGCTCCGCAATCTTGATGATTCAGTTCAGGT GATCTCTGAAGTTGCACTTGAGGTTCTGGACAAAAATCCCGCGGTTATTCCGGGTTTTCT TGAAGTTCTCTCCGATGATGAGGCACGTATCGTTGGAAAGTTGTTGATGGATAAAATCCT TGAGCATCCGACAAAGGCCCTTGAGGAAGTTGTCAAGGCCGTGGCGAGGAGGGTTAGATC AGAAGCCATGTGGGTAAAGGTCGCCAGGTACTACACTCTGCTGGGGGACGTTGAGACGGC TAGAAATATCGGGGTTGTACTCCAGAATCCCAAGCTCCGCTCGATAGTTCTTGCGGACGT TGCCAGAAGTTACTTGAAACAGAACAAAATAGAAGAGGCC'
    pythonReaderOutput = pythonReaderOutput.replace(/\s/g, '')

    const seq = await t.getSequence('chr1', 0, 10000)

    expect(seq.length).toEqual(10000)
    expect(seq.split('')).toEqual(pythonReaderOutput.split(''))
  })

  it('has correct behavior when refSeq not defined in file', async () => {
    const t = new TwoBitFile({
      path: require.resolve('./data/foo.2bit'),
      seqChunkSize: 3,
    })

    expect(await t.getSequence('foo', 3, 4)).toBe(undefined)
  })
  it('loads volvox.2bit', async () => {
    const t2 = new TwoBitFile({
      path: require.resolve('./data/volvox.2bit'),
    })
    const seq = await t2.getSequence('ctgA', 0, 50000)
    expect(seq.length).toEqual(50000)

    const seqFromFasta =
      'ACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGATACATGCTAGCTACGTGCATGCTCGACATGCATCATCAGCCTGATGCTGAT'
    expect(await t2.getSequence('ctgB', 0, 5000)).toBe(seqFromFasta)
  })

  it("empty.2bit returns no data, but doesn't crash", async () => {
    const t4 = new TwoBitFile({
      path: require.resolve('./data/empty.2bit'),
    })
    expect(await t4.getSequence('unimportant', 0, 4000)).toBe(undefined)
  })

  it(
    'can get all the sequences and lengths in out2.2bit in reasonable time',
    async () => {
      const t = new TwoBitFile({
        path: require.resolve('./data/out2.2bit'),
      })

      const sizes = await t.getSequenceSizes()
      expect(Object.keys(sizes).length).toEqual(10000)
      expect(sizes['1']).toBe(4)
    },
    6000,
  )

  it('can get the length of ctgA in volvox.2bit', async () => {
    const t2 = new TwoBitFile({
      path: require.resolve('./data/volvox.2bit'),
    })

    expect(await t2.getSequenceSize('ctgA')).toBe(50001)
    expect(await t2.getSequenceSize('ctgB')).toBe(6079)
  })
})
